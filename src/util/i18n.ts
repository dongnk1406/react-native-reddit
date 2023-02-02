import {Alert} from 'react-native';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import resources from 'src/assets/locales';
import {store} from 'src/store';
import {updateLanguage} from 'src/store/slices/commonSlice';

// const languageDetector = {
//   type: 'languageDetector',
//   detect: () => DeviceInfo.getDeviceLocale(),
//   init: () => {},
//   cacheUserLanguage: () => {},
// };

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: resources,
  fallbackLng: 'en',
  lng: store.getState().common.language,
  interpolation: {
    escapeValue: false,
  },
});

export const changeLanguage = (key: string) => {
  store.dispatch(updateLanguage(key));
  i18n
    .changeLanguage(key)
    .catch(err => Alert.alert('Cannot change language' + err));
};

export default i18n;
