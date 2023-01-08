import {config} from 'app-config';
import React, {useRef} from 'react';
import {PanResponder, StyleSheet, Text, View, Animated} from 'react-native';

const BOTTOM_SHEET_MAX_HEIGHT = config.layout.windowHeight * 0.6;
const BOTTOM_SHEET_MIN_HEIGHT = config.layout.windowHeight * 0.08;
const MAX_UPWARD_TRANSLATE_Y =
  BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT;
const MAX_DOWNWARD_TRANSLATE_Y = 0;

function SettingScreen() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log(animatedValue);
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gestureState) => {
        animatedValue.setValue(gestureState.dy);
      },
      onPanResponderRelease(e, gestureState) {
        lastGestureDy.current += gestureState.dy;
        if (lastGestureDy.current < MAX_UPWARD_TRANSLATE_Y) {
          lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y;
        } else if (lastGestureDy.current > MAX_DOWNWARD_TRANSLATE_Y) {
          lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y;
        }
      },
    }),
  ).current;

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  return (
    <View style={styles.container}>
      <Text>Hello Setting</Text>
      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.draggableArea} {...panResponder.panHandlers}>
          <View style={styles.dragHandle}></View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    ...config.color.shadow,
    backgroundColor: config.color.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  draggableArea: {
    alignItems: 'center',
    flexGrow: 1,
  },
  dragHandle: {
    width: 50,
    height: 4,
    marginTop: 10,
    backgroundColor: config.color.border,
    borderRadius: 10,
  },
});

export default SettingScreen;
