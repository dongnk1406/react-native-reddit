import React from 'react';
import {View, Text, Button} from 'react-native';
import { PolicyProps } from '.';

const PolicyScreen = ({navigation}: PolicyProps) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Policy Screens</Text>
      <Button title="I agree with policy" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default PolicyScreen;
