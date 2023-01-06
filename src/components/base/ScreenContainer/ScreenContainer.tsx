import {config} from 'app-config';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

interface ScreenContainerProps {
  children: React.ReactNode;
  backgroundColor?: string | null;
}

const ScreenContainer = ({children, backgroundColor}: ScreenContainerProps) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: backgroundColor || config.color.white,
        height: '100%',
      }}>
      <StatusBar barStyle="dark-content" />
      {children}
    </SafeAreaView>
  );
};

export default ScreenContainer;
