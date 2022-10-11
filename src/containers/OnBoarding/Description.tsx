import React, {useEffect, useState, useMemo, memo} from 'react';
import {View, Animated} from 'react-native';
import {config} from 'app-config';
import { DescriptionProps } from '.';

const Description = ({data}: DescriptionProps) => {
  const title = useMemo(() => {
    return data.title.trim().split(' ');
  }, [data]);
  const [wordsAnimatedValue] = useState(title.map(() => new Animated.Value(0)));

  useEffect(() => {
    const animations = wordsAnimatedValue.map((word: any) => {
      return Animated.timing(word, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      });
    });

    Animated.stagger(100, animations).start();
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
      {title.map((word: string, index: number) => {
        return (
          <Animated.Text
            key={index}
            style={{
              textAlign: 'center',
              color: config.color.primary,
              fontSize: 22,
              fontWeight: '700',
              opacity: wordsAnimatedValue[index],
            }}>
            {word}
            {index < title.length ? ' ' : ''}
          </Animated.Text>
        );
      })}
    </View>
  );
};

export default memo(Description);
