import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { config } from 'app-config';

export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = value => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View
      style={{
        height: 45,
        width: '100%',
        backgroundColor: '#e4e4e4',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          backgroundColor:
            getSelectionMode == 1 ? config.color.primary : '#e4e4e4',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color:
              getSelectionMode == 1 ? config.color.white : config.color.primary,
            fontSize: 14,
          }}>
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          backgroundColor:
            getSelectionMode == 2 ? config.color.primary : '#e4e4e4',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color:
              getSelectionMode == 2 ? config.color.white : config.color.primary,
            fontSize: 14,
          }}>
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
