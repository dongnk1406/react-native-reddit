import React from 'react';
import {View} from 'react-native';

import GameMessage from './GameMessage';
import GridContainer from './GridContainer';
import TileContainer from './TileContainer';

import Dimensions from '../utils/dimensions';
const {height, width} = Dimensions.get('window');

const styles = {
  container: {
    width: width - Dimensions.size['10'],
    height: width - Dimensions.size['10'],
    backgroundColor: '#bbada0',
    borderRadius: Dimensions.size['2'],
    marginTop: Dimensions.size['6'],
  },
};

const GameBoard = props => {
  return (
    <View style={styles.container}>
      <GridContainer />
      <TileContainer tiles={props.tiles} />
      <GameMessage
        won={props.won}
        over={props.over}
        onKeepGoing={props.onKeepGoing}
        onTryAgain={props.onTryAgain}
      />
    </View>
  );
};

export default GameBoard;
