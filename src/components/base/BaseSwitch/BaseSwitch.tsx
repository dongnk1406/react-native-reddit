import React from 'react';
import {Switch} from 'react-native';
import {config, isIOSPlatform} from 'app-config';
import {BaseSwitchProps} from '.';

const BaseSwitch = ({onValueChange, value}: BaseSwitchProps) => {
  return (
    <Switch
      trackColor={{
        false: config.color.placeholder,
        true: config.color.primary,
      }}
      thumbColor={config.color.white}
      onValueChange={onValueChange}
      value={value}
      style={isIOSPlatform ? {transform: [{scaleX: 0.8}, {scaleY: 0.8}]} : {}}
    />
  );
};

export default BaseSwitch;
