import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {config} from 'app-config';
import {BaseButtonProps} from '.';
import {hexToRgba} from 'src/helper';

const BaseButton = ({
  label,
  uppercase,
  textStyle,
  style,
  containerStyle,
  disable,
  color,
  onPress,
}: BaseButtonProps) => {
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
        style={[
          {
            height: 50,
            width: '85%',
            borderRadius: 12,
            backgroundColor: disable
              ? config.color.border
              : hexToRgba(color || config.color.primary, 0.5),
            marginVertical: 5,
          },
          containerStyle,
        ]}>
        <View
          style={[
            {
              position: 'absolute',
              bottom: 3,
              backgroundColor: disable
                ? config.color.disable
                : color || config.color.primary,
              height: 50,
              width: '100%',
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{translateY: isPressed ? 3 : 0}],
            },
            style,
          ]}>
          <Text
            style={[
              {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18,
                color: disable
                  ? config.color.typography.disableText
                  : config.color.typography.textLight,
              },
              uppercase ? {textTransform: 'uppercase'} : null,
              textStyle,
            ]}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BaseButton;
