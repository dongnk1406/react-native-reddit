// This is grid tile, absolute on grid container

import {View} from 'react-native';
import React from 'react';
import Tile from './Tile';
import Dimensions from '../utils/dimensions';
const {height, width} = Dimensions.get('window');

const styles = {
  container: {
    width: width - Dimensions.size['10'],
    height: width - Dimensions.size['10'],
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden',
  },
};

const TileContainer = ({tiles}) => {
  return (
    <View style={styles.container}>
      {tiles.map(tile => {
        return <Tile tile={tile} key={tile.prog} />;
      })}
    </View>
  );
};

export default TileContainer;
