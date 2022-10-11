import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {ProfileProps} from '.';

const ProfileScreen = ({navigation}: ProfileProps) => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <Text>Profile Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
