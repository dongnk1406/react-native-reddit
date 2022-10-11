import React, {useState, useCallback, memo} from 'react';
import {View, Text, StyleSheet, Animated, Button} from 'react-native';
import SunRay from './SunRay';

const SIZE_BLOCK_SUN_RAY_LIST = 160;

const Sun = ({animate}) => {
  const [sunAnimation] = useState(new Animated.Value(0));

  const handleSunAnimate = useCallback(() => {
    Animated.sequence([
      Animated.timing(sunAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(sunAnimation, {
        toValue: 0,
        duration: 500,
        mass: 10,
        damping: 30,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.sunLayer,
        {
          transform: [
            {
              scale: sunAnimation.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 1.1, 1.2],
              }),
            },
            {
              rotate: sunAnimation.interpolate({
                inputRange: [0, 0.3, 0.7, 1],
                outputRange: ['0deg', '90deg', '-90deg', '30deg'],
              }),
            },
          ],
        },
      ]}>
      <SunRay
        animate={animate}
        sizeBlockSunRayList={SIZE_BLOCK_SUN_RAY_LIST}
        handleSunAnimate={handleSunAnimate}
      />
      <View style={styles.sunLayer1}>
        <View style={styles.sunLayer2}>
          <Text style={styles.text}>Sun</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const App = props => {
  const [isAnimate, setAnimate] = useState(false);

  const handleAnimate = useCallback(() => {
    setAnimate(preState => !preState);
  }, []);

  return (
    <View style={styles.container}>
      <Sun animate={isAnimate} />
      <Button title="Toggle" color={'#fbaa59'} onPress={handleAnimate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333552',
  },
  sunLayer: {
    padding: 20,
    borderRadius: 999,
    width: SIZE_BLOCK_SUN_RAY_LIST,
    height: SIZE_BLOCK_SUN_RAY_LIST,
    marginBottom: 40,
  },
  sunLayer1: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbaa59',
    width: SIZE_BLOCK_SUN_RAY_LIST,
    height: SIZE_BLOCK_SUN_RAY_LIST,
    borderWidth: 20,
    borderColor: '#cc9b56',
    borderRadius: 999,
  },
  sunLayer2: {
    backgroundColor: '#d97846',
    paddingHorizontal: 20,
    paddingVertical: 26,
    borderRadius: 999,
  },
  text: {
    color: '#333552',
    fontWeight: '600',
    fontSize: 22,
  },
});

export default memo(App);
