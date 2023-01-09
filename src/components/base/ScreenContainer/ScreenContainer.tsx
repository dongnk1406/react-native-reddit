import {config} from 'app-config';
import React from 'react';
import {StatusBar, ColorValue} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TStyle} from 'src/type';

interface ScreenContainerProps {
  children: React.ReactNode;
  backgroundColor?: ColorValue | null;
  overrideStyle?: TStyle;
}

const ScreenContainer = ({
  children,
  backgroundColor,
  overrideStyle,
  ...props
}: ScreenContainerProps) => {
  return (
    <SafeAreaView
      {...props}
      style={{
        backgroundColor: backgroundColor || config.color.white,
        flex: 1,
        ...overrideStyle,
      }}>
      <StatusBar barStyle="dark-content" />
      {children}
    </SafeAreaView>
  );
};

export default ScreenContainer;
