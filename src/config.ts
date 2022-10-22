import {Dimensions, Platform, StatusBar} from 'react-native';
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const isIphoneX =
  Platform.OS === 'ios' && (windowHeight > 800 || windowWidth > 800);

const isIOSPlatform = Platform.OS === 'ios';
const isAndroidPlatform = Platform.OS === 'android';
const heightStatusBar = StatusBar.currentHeight;

const config = {
  color: {
    white: '#fff',
    gray: '#999',
    black: '#000',
    primary: '#ad1c6d',
    subPrimary: '#ad1c6aad',
    sub: '#f5bb4b',
    secondary: '#0aada8',
    addition: '#AD40AF',
    notification: '#e46161',
    placeholder: '#c7c7cd',
    border: '#c7c7cd',
    disable: '#e6e6e6',
    overlay: 'rgba(0,0,0,.6)',
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2.25,
      },
      shadowOpacity: 0.161,
      shadowRadius: 3,
      elevation: 5,
    },
    brand: {
      facebook: '#4267B2',
      youtube: '#FF0000',
    },
    status: {
      danger: '#ef476f',
      warning: '#ffd166',
      success: '#06d6a0',
      info: '#118ab2',
      other: '#073b4c',
    },
    typography: {
      text: '#2B2B2B',
      textLight: '#fff',
      secondary: '#A0A0A0',
      disableText: '#b5b5b5',
    },
  },
  layout: {
    windowWidth: windowWidth,
    windowHeight: windowHeight,
    activeOpacity: 0.6,
  },
};
export {config, isIphoneX, isIOSPlatform, isAndroidPlatform, heightStatusBar};
