import React, {useEffect, useState} from 'react';
import {config} from 'app-config';
import {StyleSheet, View, Text} from 'react-native';
import {TimeProps} from '.';

const Timer = ({timeCountDown, counting}: TimeProps) => {
  const [timeCount, setTimeCount] = useState<number>(100);

  const formatTimeToStandard = (time: Number) => {
    if (Number(time) === 0) {
      return '00';
    } else if (Number(time) && Number.isInteger(time)) {
      return time < 10 ? `0${time}:00` : `${time}:00`;
    } else if (!Number.isInteger(time)) {
      const cloneTime = String(time).split('.');
    }
  };

  useEffect(() => {
    if (timeCount <= 0) {
      return;
    }
    let timerId = setInterval(() => {
      counting && setTimeCount(prev => prev - 1);
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [timeCount, counting]);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
      }}>
      <Text style={[styles.text, {fontWeight: 'bold', fontSize: 85}]}>
        {timeCount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: config.color.typography.textLight,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Timer;
