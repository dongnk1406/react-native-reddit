import {TouchableHighlightProps, TouchableOpacityProps} from 'react-native';
import {TItemStyle, TStyle} from 'src/type';

export {default} from './BaseButton';

export interface BaseButtonProps
  extends TouchableOpacityProps,
    TouchableHighlightProps {
  label: string;
  onPress: () => void;
  uppercase?: boolean;
  style?: TStyle;
  containerStyle?: TStyle;
  textStyle?: TItemStyle;
  disable?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
}
