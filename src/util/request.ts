import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {store} from 'src/store';

let hasAnyNetworkDialogShown = false;

export const request = axios.create({
  baseURL: 'https://62ff2c7134344b6431f3db0c.mockapi.io/api/v1',
  timeout: 10000,
  headers: {
    Accept: '*/*',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});

export const get = async (path: string, options: any) => {
  const response = await request.get(path, options);
  return response.data;
};

export const post = async (path: string, options: object) => {
  const response = await request.post(path, options);
  return response.data;
};

export const rejectError = (err: string, validNetwork: boolean) => {
  // Avoid being null
  if (validNetwork !== false) {
    return Promise.reject('Error' + err);
  }
  return Promise.reject('ERROR NETWORK');
};

request.interceptors.request.use(
  async (config: any) => {
    // Do something before API is sent
    const {
      auth: {userToken},
      common: {language},
    } = store.getState();
    if (userToken) {
      config.headers.Authorization = userToken;
    }
    if (language) {
      config.headers['X-localization'] = language;
    }
    return config;
  },
  (error: any) => {
    // Do something with API error
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
    console.log('% Failed %');
    if (data?.code === 401 && data?.data?.isBlock) {
      return rejectError(error, validNetwork);
    }
    return Promise.reject(data);
  },
);
