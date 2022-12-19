import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import Config from 'react-native-config';
// import AuthenticateService from '@utils/auth/AuthenticateService';
// import {showToastFail} from 'utils/helper';
// import {apiLogger} from '@utils/helper';
// import i18next from 'utils/i18next';
// import {store} from 'redux/store';

let hasAnyNetworkDialogShown = false;

const request = axios.create({
  baseURL: Config.API_URL,
  timeout: 8000,
  headers: {
    Accept: '*/*',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});
// for multiple requests
let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token: string | null | undefined = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const rejectError = (err: string, validNetwork: boolean) => {
  // Avoid being null
  if (validNetwork !== false) {
    return Promise.reject(i18next.t(err));
  }
  return Promise.reject(i18next.t('ERROR NETWORK'));
};

request.interceptors.request.use(
  async (config: any) => {
    // Do something before API is sent
    const {
      userInfo: {token},
      language: {key},
    } = store.getState();
    if (token) {
      config.headers.Authorization = token;
    }
    if (key) {
      config.headers['X-localization'] = key;
    }
    return config;
  },
  (error: any) => {
    // Do something with API error
    apiLogger(
      `%c FAILED ${error.response.method?.toUpperCase()} from ${
        error.response.config.url
      }:`,
      'background: red; color: #fff',
      error.response,
    );
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response: any) => response.data,
  async (error: any) => {
    // Check network first
    const network: any = await NetInfo.fetch();
    const validNetwork = network.isInternetReachable && network.isConnected;
    // validNetwork on first render in iOS will return NULL
    if (validNetwork === false && !hasAnyNetworkDialogShown) {
      hasAnyNetworkDialogShown = true;
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const {response} = error ?? {};
    const {data} = response ?? {};
    apiLogger(
      `%c FAILED ${error.config?.method?.toUpperCase()} from ${
        error?.config?.url
      }:`,
      'background: red; color: #fff',
      error.response,
    );
    if (data?.code === 401 && data?.data?.isBlock) {
      showToastFail(data?.data?.message);
      AuthenticateService.logOut();
      return rejectError(error, validNetwork);
    }
    return Promise.reject(data);
  },
);

export default request;
