import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {config} from 'app-config';
import {BaseButtonProps} from '.';

const BaseButton = ({label, uppercase, onPress}: BaseButtonProps) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        activeOpacity={config.layout.activeOpacity}
        onPress={onPress}
        style={{
          width: '90%',
          backgroundColor: config.color.primary,
          paddingVertical: 12,
          borderRadius: 10,
          marginVertical: 5,
        }}>
        <Text
          style={[
            {
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
              color: config.color.white,
            },
            uppercase ? {textTransform: 'uppercase'} : null,
          ]}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BaseButton;
