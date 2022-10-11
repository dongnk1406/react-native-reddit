import { config } from 'app-config';
import React, {useState, useEffect, memo, useCallback} from 'react';
import {Text, StyleSheet, Animated} from 'react-native';

const SIZE_ITEM = (config.layout.windowWidth - 50) / 5;

const BoardItem = ({item, correctWord, position, row}) => {
  const [correct, setCorrect] = useState(false);
  const [almost, setAlmost] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [scale] = useState(new Animated.Value(1));

  const isValidWord = Math.floor(item.id / 5) < row;
  // convert the position of text input same index of correctWord
  const currentPosition = (position - 1) % 5;

  const statusBoardItemBackgroundStyle =
    isValidWord &&
    (correct
      ? styles.correct
      : almost
      ? styles.almost
      : incorrect
      ? styles.incorrect
      : {});

  const textLightStyle =
    isValidWord && (correct || almost || incorrect) && styles.textLight;

  const scaleAnimationStyle = {
    transform: [
      {
        scale: scale,
      },
    ],
  };

  useEffect(() => {
    scaleAnimation();
    if (item.content === correctWord[currentPosition] && item.content !== '') {
      setCorrect(true);
    } else if (
      !correct &&
      item.content !== '' &&
      correctWord.includes(item.content)
    ) {
      setAlmost(true);
    } else if (
      !correct &&
      item.content !== '' &&
      !correctWord.includes(item.content)
    ) {
      setIncorrect(true);
    }
    
    return () => {
      setCorrect(false);
      setAlmost(false);
      setIncorrect(false);
    };
  }, [item.content]);

  const scaleAnimation = useCallback(() => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scale]);

  return (
    <Animated.View
      style={[
        styles.container,
        !!item.content && styles.filled,
        statusBoardItemBackgroundStyle,
        scaleAnimationStyle,
      ]}>
      <Text style={[styles.textDark, textLightStyle]}>{item.content}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE_ITEM,
    height: SIZE_ITEM,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  filled: {
    borderColor: '#878a8c',
  },
  correct: {
    backgroundColor: '#79b851',
    borderColor: 'transparent',
  },
  almost: {
    backgroundColor: '#f3c237',
    borderColor: 'transparent',
  },
  incorrect: {
    backgroundColor: '#99a0b0',
    borderColor: 'transparent',
  },
  textDark: {
    color: '#393e4c',
    fontSize: 30,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  textLight: {
    color: '#fff',
  },
});

export default memo(BoardItem);
