import {config, isAndroidPlatform} from 'app-config';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {PomoFocusProps} from '.';
import {ThemeProvider} from 'react-native-elements';
import {BaseButton} from 'src/components';

const PomoFocusScreen = ({navigation}: PomoFocusProps) => {
  const [mode, setMode] = useState<string>('pomodoro');

  useEffect(() => {
    return () => {
      isAndroidPlatform
        ? StatusBar.setBackgroundColor(config.color.primary)
        : () => {};
    };
  }, []);

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
      <StatusBar backgroundColor={getBackgroundColorForMode(mode)} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: getBackgroundColorForMode(mode),
        }}>
        <View style={{marginHorizontal: 12, flex: 1}}>
          <View
            style={{
              borderBottomWidth: 0.5,
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

          <ScrollView>
            <View
              style={{
                backgroundColor: '#ffffff1a',
                borderRadius: 12,
                marginVertical: 20,
                padding: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  activeOpacity={config.layout.activeOpacity}
                  onPress={() => setMode('pomodoro')}
                  style={{
                    borderRadius: 6,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    backgroundColor:
                      mode === 'pomodoro' ? '#00000026' : 'transparent',
                  }}>
                  <Text style={styles.text}>Pomodoro</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={config.layout.activeOpacity}
                  onPress={() => setMode('short_break')}
                  style={{
                    backgroundColor:
                      mode === 'short_break' ? '#00000026' : 'transparent',
                    borderRadius: 6,
                    paddingHorizontal: 12,
                    paddingVertical: 3,
                  }}>
                  <Text style={styles.text}>Short Break</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={config.layout.activeOpacity}
                  onPress={() => setMode('long_break')}
                  style={{
                    backgroundColor:
                      mode === 'long_break' ? '#00000026' : 'transparent',
                    borderRadius: 6,
                    paddingHorizontal: 12,
                    paddingVertical: 3,
                  }}>
                  <Text style={styles.text}>Long Break</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                }}>
                <Text style={[styles.text, {fontWeight: 'bold', fontSize: 85}]}>
                  25:00
                </Text>
              </View>

              <View>
                <BaseButton
                  label="Start"
                  uppercase
                  textStyle={{
                    color: getBackgroundColorForMode(mode),
                  }}
                  style={{
                    backgroundColor: '#fff',
                  }}
                  onPress={() => {}}
                  containerStyle={{width: '50%', backgroundColor: '#c7c7cd'}}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  text: {
    color: config.color.typography.textLight,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default PomoFocusScreen;
