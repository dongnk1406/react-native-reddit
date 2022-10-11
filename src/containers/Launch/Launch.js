import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Image,
  StatusBar,
} from 'react-native';
import {config} from 'app-config';

class Launch extends Component {
  state = {
    animatedBouncing: new Animated.Value(0),
    animatedPressing: new Animated.Value(0),
    animatedSpreading: new Animated.Value(0),
    animatedSpreadingShadow: new Animated.Value(0),
  };

  componentDidMount() {
    this.animateLoading();
  }

  animateLoading = () => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(this.state.animatedBouncing, {
            toValue: 30,
            easing: Easing.circle,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.animatedPressing, {
            toValue: 1,
            easing: Easing.bounce,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.animatedPressing, {
            toValue: 0,
            easing: Easing.in,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.animatedBouncing, {
            toValue: 60,
            easing: Easing.in,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.animatedBouncing, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.parallel([
            Animated.timing(this.state.animatedSpreading, {
              toValue: 1,
              easing: Easing.in,
              duration: 600,
              delay: 400,
              useNativeDriver: true,
            }),
            Animated.timing(this.state.animatedSpreadingShadow, {
              toValue: 1,
              easing: Easing.in,
              duration: 600,
              delay: 500,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(this.state.animatedSpreading, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.animatedSpreadingShadow, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={config.color.primary} />
        <View style={{display: 'flex'}}>
          <View style={styles.logoContainer}>
            <Image
              source={require('src/assets/images/logo.jpg')}
              style={styles.logo}
              resizeMode="cover"
            />

            <View style={styles.animateLoading}>
              <Animated.View
                style={[
                  styles.dot,
                  {
                    opacity: this.state.animatedBouncing.interpolate({
                      inputRange: [0, 30, 60],
                      outputRange: [0.6, 1, 0.6],
                    }),
                    transform: [
                      {
                        translateY: this.state.animatedBouncing.interpolate({
                          inputRange: [0, 30, 60],
                          outputRange: [0, 30, 0],
                        }),
                      },
                      {
                        scale: this.state.animatedBouncing.interpolate({
                          inputRange: [0, 30, 60],
                          outputRange: [0.6, 1, 0.6],
                        }),
                      },
                      {
                        scaleX: this.state.animatedPressing.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.3],
                        }),
                      },
                      {
                        scaleY: this.state.animatedPressing.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 0.7],
                        }),
                      },
                    ],
                  },
                ]}>
                <Animated.View
                  style={[
                    styles.leftHalf,
                    {
                      opacity: this.state.animatedBouncing.interpolate({
                        inputRange: [0, 15, 30, 45, 60],
                        outputRange: [0, 1, 1, 1, 0],
                      }),
                      transform: [
                        {
                          rotate: this.state.animatedBouncing.interpolate({
                            inputRange: [0, 15, 30, 45, 60],
                            outputRange: [
                              '-360deg',
                              '-180deg',
                              '0deg',
                              '180deg',
                              '360deg',
                            ],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              </Animated.View>

              <Animated.View
                style={[
                  styles.spreadingShadow,
                  {
                    opacity: this.state.animatedSpreadingShadow.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, 1, 0],
                    }),
                  },
                  {
                    transform: [
                      {
                        scaleX: this.state.animatedSpreadingShadow.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 8],
                        }),
                      },
                      {
                        scaleY: this.state.animatedSpreadingShadow.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.6, 1.5],
                        }),
                      },
                    ],
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.spreading,
                  {
                    opacity: this.state.animatedSpreading.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, 1, 0],
                    }),
                    transform: [
                      {
                        scaleX: this.state.animatedSpreading.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 5],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  logoContainer: {
    position: 'absolute',
    top: config.layout.windowHeight * 0.3,
    alignSelf: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 24,
  },
  animateLoading: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftHalf: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderBottomColor: 'transparent',
    borderRadius: 10,
    borderTopColor: config.color.sub,
  },
  dot: {
    borderRadius: 10,
    width: 20,
    height: 20,
    overflow: 'hidden',
    backgroundColor: config.color.primary,
  },
  bouncing: {},
  spreadingShadow: {
    top: 55,
    borderRadius: 7.5,
    width: 15,
    height: 15,
    zIndex: -2,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: config.color.sub,
  },
  spreading: {
    top: 55,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 10,
    height: 10,
    zIndex: -1,
    backgroundColor: config.color.primary,
  },
});

export default Launch;
