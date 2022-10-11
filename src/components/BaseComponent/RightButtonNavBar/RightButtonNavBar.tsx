import React from 'react';
import {TouchableOpacity, Keyboard, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {config} from 'app-config';

const RightButtonNavBar = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={config.layout.activeOpacity}
      onPress={() => {
        Keyboard.dismiss();
        navigation.openDrawer();
      }}>
      <Image
        source={{
          uri: 'https://i.redd.it/snoovatar/avatars/16f0557d-0d6d-4b6f-8b2b-ad1b305c8c39.png',
        }}
        style={{
          marginRight: 10,
          width: 30,
          height: 30,
          backgroundColor: '#ecedf0',
          borderRadius: 15,
        }}
      />
    </TouchableOpacity>
  );
};

export default RightButtonNavBar;
