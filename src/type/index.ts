import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export type TItemStyle = ViewStyle | TextStyle | Animated.AnimateStyle<any>;

export type TStyle = StyleProp<TItemStyle> | StyleProp<TItemStyle>[];

export type TNavigationProp = NavigationProp<ParamListBase>;

export interface NavigationProps {
  navigation?: TNavigationProp;
}
