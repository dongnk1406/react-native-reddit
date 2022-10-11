import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

import Dimensions from '../utils/dimensions';
import {config} from 'app-config';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginVertical: Dimensions.size['10'],
  },
  textContainer: {
    flex: 1,
    marginRight: Dimensions.size['4'],
  },
  text: {
    color: '#776E65',
    fontSize: Dimensions.size['6'],
    lineHeight: Dimensions.size['8'],
  },
  boldText: {
    fontWeight: 'bold',
  },
  newGameContainer: {
    backgroundColor: '#ec8d53',
    paddingHorizontal: Dimensions.size['2'],
    paddingVertical: Dimensions.size['2'],
    borderRadius: Dimensions.size['2'],
  },
  newGame: {
    color: '#fff',
    fontWeight: '600',
    fontSize: Dimensions.size['6'],
  },
});

const AboveGame = ({onRestartGame}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Join the numbers and get to the
          <Text style={styles.boldText}> 2048 tile!</Text>
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={config.layout.activeOpacity}
        onPress={onRestartGame}>
        <View style={styles.newGameContainer}>
          <Text style={styles.newGame}>New Game</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AboveGame;
