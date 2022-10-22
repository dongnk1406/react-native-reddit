import {config, isAndroidPlatform} from 'app-config';
import React, {useEffect, useMemo, useState} from 'react';
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
import Timer from './Timer';

const PomoFocusScreen = ({navigation}: PomoFocusProps) => {
  const [mode, setMode] = useState<string>('pomodoro');
  const [isCounting, setCounting] = useState<boolean>(false);
  const [timeCountDown, setTimeCountDown] = useState<number>(0);

  useEffect(() => {
    return () => {
      isAndroidPlatform
        ? StatusBar.setBackgroundColor(config.color.primary)
        : () => {};
    };
  }, []);

  const getStatusForMode = useMemo(() => {
    switch (mode) {
      case 'long_break':
        return {
          backgroundColor: '#457ca3',
          initTime: 15,
        };
      case 'short_break':
        return {
          backgroundColor: '#4c9195',
          initTime: 5,
        };
      default:
        return {
          backgroundColor: '#d95550',
          initTime: 25,
        };
    }
  }, [mode]);

  useEffect(() => {
    setTimeCountDown(getStatusForMode.initTime);
  }, [mode]);

  return (
    <ThemeProvider>
      <StatusBar backgroundColor={getStatusForMode.backgroundColor} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: getStatusForMode.backgroundColor,
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
                <TouchableOpacity>
                  <IconFontAwesome5 name="chart-bar" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <IconIonicons name="settings-sharp" />
                </TouchableOpacity>
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
                  onPress={() => {
                    setMode('pomodoro');
                    setCounting(false);
                  }}
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
                  onPress={() => {
                    setMode('short_break');
                    setCounting(false);
                  }}
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
                  onPress={() => {
                    setMode('long_break');
                    setCounting(false);
                  }}
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

              <Timer timeCountDown={timeCountDown} counting={isCounting} />

              <View>
                <BaseButton
                  label={isCounting ? 'Stop' : 'Start'}
                  uppercase
                  textStyle={{
                    color: getStatusForMode,
                  }}
                  color={config.color.white}
                  onPress={() => {
                    setCounting(prev => !prev);
                  }}
                  containerStyle={{width: '50%'}}
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
