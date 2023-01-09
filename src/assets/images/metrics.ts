import {vs} from 'react-native-size-matters';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import {Dimensions, StatusBar} from 'react-native';

const {width, height} = Dimensions.get('window');

const Metrics = {
  screenHeight: width < height ? height : width,
  screenWidth: width < height ? width : height,
  bottomPadding:
    StaticSafeAreaInsets.safeAreaInsetsBottom > 30
      ? StaticSafeAreaInsets.safeAreaInsetsBottom
      : vs(20),
  topPadding:
    StaticSafeAreaInsets.safeAreaInsetsTop > 30
      ? StaticSafeAreaInsets.safeAreaInsetsTop
      : vs(20),
  statusBarHeight: StatusBar.currentHeight,
};

export default Metrics;
