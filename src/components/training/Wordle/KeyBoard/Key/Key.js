import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
const Key = ({item, handleSetSelectedKey}) => {
  const statusKeyBackgroundStyle =
    item.status === 'correct'
      ? styles.correct
      : item.status === 'almost'
      ? styles.almost
      : item.status === 'incorrect'
      ? styles.incorrect
      : {};
  const textLightStyle = item.status !== 'normal' ? styles.textLight : {};

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.container, statusKeyBackgroundStyle]}
      onPress={() => handleSetSelectedKey(item.value)}>
      <Text style={[styles.textDark, textLightStyle]}>{item.value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: '#dce1ed',
    marginHorizontal: 2,
    padding: 10,
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
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  textLight: {
    color: '#fff',
  },
});

export default Key;
