import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {config} from 'app-config';
import {BaseButtonProps} from '.';

const BaseButton = ({label, uppercase, onPress}: BaseButtonProps) => {
  const [isPressed, setPressed] = useState<boolean>(false);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        onPress={onPress}
        style={{
          height: 50,
          width: '85%',
          borderRadius: 12,
          backgroundColor: config.color.subPrimary,
          marginVertical: 5,
        }}>
        <View
          style={{
            position: 'absolute',
            bottom: 3,
            backgroundColor: config.color.primary,
            height: 50,
            width: '100%',
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{translateY: isPressed ? 3 : 0}],
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
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BaseButton;
