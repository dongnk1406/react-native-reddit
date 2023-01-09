import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import resources from 'src/assets/locales';

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
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
