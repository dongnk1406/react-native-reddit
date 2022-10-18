import {config} from 'app-config';
import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {PomoFocusProps} from '.';
import {Button, ThemeProvider} from 'react-native-elements';

const MyApp = () => {
  return (
    <ThemeProvider>
      <Button title="Hey!" />
    </ThemeProvider>
  );
};

const PomoFocusScreen = ({navigation}: PomoFocusProps) => {
  const [mode, setMode] = useState<string>('');

  const getBackgroundColorForMode = useCallback(
    (mode: string) => {
      switch (mode) {
        case 'long_break':
          return '#457ca3';
        case 'short_break':
          return '#4c9195';
        default:
          return '#d95550';
      }
    },
    [mode],
  );

  return (
    <ThemeProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: getBackgroundColorForMode(mode),
        }}>
        <View
          style={{
            marginHorizontal: 12,
            borderBottomWidth: 1,
            paddingVertical: 10,
            borderColor: config.color.border,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderColor: config.color.border,
            }}>
            <View style={{flexDirection: 'row'}}>
              <IconFontAwesome5 name="check-circle" />
              <Text>Pomofocus</Text>
            </View>
            <View>
              <View>
                <IconFontAwesome5 name="chart-bar" />
              </View>
              <View>
                <IconIonicons name="settings-sharp" />
              </View>
            </View>
          </View>
        </View>
        <Button title="Solid Button" />

        <Button title="Outline button" type="outline" />

        <Button
          title="Clear button"
          type="clear"
          iconRight
          icon={<IconFontAwesome5 name="check-circle" />}
        />
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  text: {
    color: config.color.typography.textLight,
  },
});

export default PomoFocusScreen;
