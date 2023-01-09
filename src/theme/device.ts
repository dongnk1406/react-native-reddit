import {Dimensions, Platform, NativeModules} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

const {width, height} = Dimensions.get('window');
const {width: widthByScreen, height: heightByScreen} = Dimensions.get('screen');

const {PlatformConstants} = NativeModules;

const StatusBarHeight = getStatusBarHeight();

export const Device = {
  width,
  height,
  widthByScreen,
  heightByScreen,
  statusHeight: StatusBarHeight,
  bottomSpace: heightByScreen - height - StatusBarHeight,
  isIos: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  deviceType: PlatformConstants.interfaceIdiom,
  isSmallDevice: width < 375,
  isLargeDevice: width > 393,
};
