import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Text,
  TextInput,
  Easing,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import dayjs from 'dayjs';
import DigitalClock from './DigitalClock';

const windowWidth = Dimensions.get('window').width;
const CIRCLE_SIZE = (80 * windowWidth) / 100;
const TICK_INTERVAL = 1000;
class AnalogClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotationHoursHandAnimatedValue: new Animated.Value(0),
      rotationMinutesHandAnimatedValue: new Animated.Value(0),
      rotationSecondsHandsAnimatedValue: new Animated.Value(0),
      analogClockAnimatedValue: new Animated.Value(0),

      initTime: {
        hoursInit: 0,
        minutesInit: 0,
        secondsInit: 0,
      },
      timeInput: '',
      isWakeUp: false,
    };
    this.hourStep = Array.from({
      length: 12,
    });
    this.minuteStep = Array.from({
      length: 60,
    });
    this.timer = undefined;
  }

  getTimeInit = () => {
    const dateInstance = new Date();
    this.setState({
      initTime: {
        hoursInit: dateInstance.getHours(),
        minutesInit: dateInstance.getMinutes(),
        secondsInit: dateInstance.getSeconds(),
      },
    });
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      // chia dư cho 60, 12 vì ra không quan tâm thời gian đã qua, chỉ lấy phần dư (tức là phần thời gian hiện tại)
      const timeZone = Math.abs(new Date().getTimezoneOffset() / 60);
      const currentHour =
        ((Date.now() / (1000 * 60 * 60)) % 12) + (timeZone % 12);
      const currentMinute = (Date.now() / (1000 * 60)) % 60;
      const currentSecond = Math.floor((Date.now() / 1000) % 60);
      this.state.rotationSecondsHandsAnimatedValue.setValue(
        Math.floor((currentSecond / 60) * 360),
      );
      this.state.rotationMinutesHandAnimatedValue.setValue(
        Math.floor((currentMinute / 60) * 360),
      );
      this.state.rotationHoursHandAnimatedValue.setValue(
        (currentHour / 12) * 360,
      );
    }, TICK_INTERVAL);
    this.analogClockAnimate();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  analogClockAnimate = () => {
    Animated.sequence([
      Animated.timing(this.state.analogClockAnimatedValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),
    ]).start(() => {
      this.state.analogClockAnimatedValue.setValue(0);
      this.analogClockAnimate();
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.contentContainer}>
          <Animated.View
            style={[
              styles.clockBlock,
              this.state.isWakeUp && {
                transform: [
                  {
                    scale: this.state.analogClockAnimatedValue.interpolate({
                      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
                      outputRange: [0.5, 0.7, 1.1, 1.3, 1.5, 1],
                    }),
                  },
                ],
                opacity: this.state.analogClockAnimatedValue,
              },
            ]}>
            <View style={styles.clockInnerHour}>
              {this.hourStep.map((_, i) => {
                const angleThisItemRadius = (Math.PI / 6) * i;
                const RADIUS = ((CIRCLE_SIZE / 2) * 75) / 100;
                const coordinateHourStyle = {
                  top:
                    RADIUS * Math.sin(angleThisItemRadius - Math.PI / 2) +
                    RADIUS -
                    10,
                  left:
                    RADIUS * Math.cos(angleThisItemRadius - Math.PI / 2) +
                    RADIUS -
                    6,
                };
                return (
                  <View key={i} style={[styles.hourStep, coordinateHourStyle]}>
                    <Text style={{fontSize: 20, fontWeight: '600'}}>
                      {i === 0 ? 12 : i}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.clockInnerMinutes}>
              {this.minuteStep.map((_, i) => {
                const angleThisItemRadius = (Math.PI / 30) * i;
                const angleThisItemDegree = 6 * i;
                const RADIUS = ((CIRCLE_SIZE / 2) * 90) / 100;

                const coordinateMinuteStyle = {
                  top: RADIUS * Math.sin(angleThisItemRadius) + RADIUS + 16,
                  left: RADIUS * Math.cos(angleThisItemRadius) + RADIUS + 12,
                  transform: [{rotate: `${angleThisItemDegree}deg`}],
                };
                return (
                  <View
                    key={i}
                    style={[styles.minuteStep, coordinateMinuteStyle]}></View>
                );
              })}
            </View>

            <View style={styles.centerClock}>
              <Animated.View
                style={[
                  styles.wrapHand,
                  styles.wrapHoursHand,
                  {
                    transform: [
                      {
                        rotate:
                          this.state.rotationHoursHandAnimatedValue.interpolate(
                            {
                              inputRange: [0, 360],
                              outputRange: [`0deg`, `360deg`],
                            },
                          ),
                      },
                    ],
                  },
                ]}>
                <View style={[styles.hoursHand]}></View>
              </Animated.View>

              <Animated.View
                style={[
                  styles.wrapHand,
                  styles.wrapMinutesHand,
                  {
                    transform: [
                      {
                        rotate:
                          this.state.rotationMinutesHandAnimatedValue.interpolate(
                            {
                              inputRange: [0, 360],
                              outputRange: [`0deg`, `360deg`],
                            },
                          ),
                      },
                    ],
                  },
                ]}>
                <View style={styles.minutesHand}></View>
              </Animated.View>

              <Animated.View
                style={[
                  styles.wrapHand,
                  styles.wrapSecondsHand,
                  {
                    transform: [
                      {
                        rotate:
                          this.state.rotationSecondsHandsAnimatedValue.interpolate(
                            {
                              inputRange: [0, 360],
                              outputRange: [`0deg`, `360deg`],
                            },
                          ),
                      },
                    ],
                  },
                ]}>
                <View style={styles.secondsHand}></View>
              </Animated.View>

              <View style={styles.centerClock}></View>
            </View>
            <DigitalClock />
          </Animated.View>

          <View style={styles.timeInputBlock}>
            <TextInput
              placeholder="hh:mm"
              value={this.state.timeInput}
              onChangeText={text =>
                this.setState({
                  timeInput: text,
                })
              }
              style={styles.timeInputTyping}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  clockBlock: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 999,
    borderWidth: 10,
    borderColor: '#ee9599',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faf2ee',
  },
  clockInnerHour: {
    width: '80%',
    height: '80%',
    borderRadius: 999,
  },
  clockInnerMinutes: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 999,
    position: 'absolute',
  },
  centerClock: {
    zIndex: 1,
    position: 'absolute',
    backgroundColor: '#000',
    width: 10,
    height: 10,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourStep: {
    position: 'absolute',
  },
  minuteStep: {
    position: 'absolute',
    width: 10,
    height: 2,
    backgroundColor: '#b03b60',
  },
  wrapHand: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  wrapHoursHand: {
    height: CIRCLE_SIZE / 3,
  },
  wrapMinutesHand: {
    height: CIRCLE_SIZE / 2,
  },
  wrapSecondsHand: {
    height: CIRCLE_SIZE / 1.5,
  },
  hoursHand: {
    backgroundColor: '#000',
    width: 6,
    height: '60%',
    borderRadius: 8,
  },
  minutesHand: {
    backgroundColor: '#000',
    width: 3,
    height: '60%',
    borderRadius: 8,
  },
  secondsHand: {
    backgroundColor: '#b03b60',
    width: 1,
    height: '60%',
    borderRadius: 8,
  },
  timeInputBlock: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  timeInputTyping: {
    flex: 1,
    paddingHorizontal: 12,
    height: '100%',
    backgroundColor: '#ffe0ce',
    fontSize: 24,
    borderRadius: 4,
    fontWeight: '600',
  },
  timeInputSet: {
    marginLeft: 8,
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#ffe0ce',
    borderRadius: 4,
    paddingHorizontal: 4,
  },
});

export default AnalogClock;
