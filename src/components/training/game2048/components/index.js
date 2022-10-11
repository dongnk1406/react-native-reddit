import React from 'react';
import GameContainer from './GameContainer';

export default function Game2048 () {
  return (
    <>
      <GameContainer startTiles={2} size={4} />
    </>
  );
}
