import React, {FunctionComponent} from 'react';
import {
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  TouchableHighlightProps,
} from 'react-native';
import {throttle} from 'lodash';
import {config} from 'app-config';

interface StyledTouchableProps
  extends TouchableOpacityProps,
    TouchableHighlightProps {
  customStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?(): void;
  onPressIn?(): void;
  onPressOut?(): void;
  onLongPress?(): void;
  children?: any;
  throttleTime?: number;
}

const StyledTouchable: FunctionComponent<StyledTouchableProps> = (
  props: StyledTouchableProps,
) => {
  const {
    customStyle,
    disabled,
    children,
    throttleTime = 500,
    onPress = () => {},
  } = props;

  const handlePress = throttle(onPress, throttleTime, {
    trailing: false,
  });

  return (
    <TouchableOpacity
      activeOpacity={config.layout.activeOpacity}
      disabled={disabled}
      style={customStyle}
      onPress={handlePress}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default StyledTouchable;
