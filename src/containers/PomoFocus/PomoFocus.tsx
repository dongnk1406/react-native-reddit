import {config} from 'app-config';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
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
  const [isPressed, setPressed] = useState<boolean>(false);

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

  console.log(isPressed);

  return (
    <ThemeProvider>
      <SafeAreaView
        style={{
          flex: 1,
          // backgroundColor: getBackgroundColorForMode(mode),
          backgroundColor: 'white',
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

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            onPress={() => console.log('btn pressed')}
            style={{
              height: 50,
              width: 200,
              borderRadius: 12,
              backgroundColor: config.color.subPrimary,
            }}>
            <View
              style={{
                position: 'absolute',
                bottom: 5,
                backgroundColor: config.color.primary,
                height: 50,
                width: 200,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{translateY: isPressed ? 5 : 0}],
              }}>
              <Text>Press in</Text>
            </View>
          </TouchableOpacity>
        </View>
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
