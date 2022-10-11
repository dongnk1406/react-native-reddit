import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {SettingProps} from '.';

const SettingFiled = ({title}: SettingProps) => {
  return (
    <TouchableHighlight>
      <View>
        <Text>{title}</Text>
        <Text>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};

function SettingScreen() {
  return (
    <ScrollView>
      <Text>Setting</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingScreen;
