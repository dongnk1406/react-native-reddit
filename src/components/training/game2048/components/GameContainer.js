import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import Animated from 'react-native-reanimated';

// Modules
import StorageManager from '../utils/localStorageManager';
import Grid from '../utils/grid';
import Tile from '../utils/tile';

// Views
import GameHeading from './GameHeading';
import AboveGame from './AboveGame';
import GameBoard from './GameBoard';

// Dimensions
import Dimensions from '../utils/dimensions';
import {isAndroidPlatform} from 'app-config';
const {height, width} = Dimensions.get('window');

// StorageManager
const storageManager = new StorageManager();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8ef',
    paddingHorizontal: Dimensions.size['5'],
  },
});

class GameContainer extends Component {
  state = {
    tiles: [],
    score: 0,
    over: false,
    win: false,
    keepPlaying: false,
    grid: new Grid(this.props.size),
    size: this.props.size,
  };

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) =>
      this.handleStartShouldSetPanResponder(e, gestureState),
    onMoveShouldSetPanResponder: (e, gestureState) =>
      this.handleMoveShouldSetPanResponder(e, gestureState),
    onPanResponderGrant: (e, gestureState) =>
      this.handlePanResponderGrant(e, gestureState),
    onPanResponderMove: (e, gestureState) =>
      this.handlePanResponderMove(e, gestureState),
    onPanResponderRelease: (e, gestureState) =>
      this.handlePanResponderEnd(e, gestureState),
  });

  moving = false;

  componentDidMount() {
    this.setup();
    if (isAndroidPlatform) {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }

  componentDidUpdate() {
    LayoutAnimation.easeInEaseOut();
  }
  handleStartShouldSetPanResponder(e = {}, gestureState = {}) {
    return true;
  }
  handleMoveShouldSetPanResponder(e = {}, gestureState = {}) {
    return true;
  }
  handlePanResponderGrant(e = {}, gestureState = {}) {
    if (this.moving == false) {
      this.moving = true;
    }
  }
  handlePanResponderMove(e = {}, gestureState = {}) {}
  handlePanResponderEnd(e = {}, gestureState = {}) {
    if (this.moving) {
      this.moving = false;

      var dx = gestureState.dx;
      var dy = gestureState.dy;
      var absDx = dx > 0 ? dx : -dx;
      var absDy = dy > 0 ? dy : -dy;
      var canMove = absDx > absDy ? absDx - absDy > 10 : absDx - absDy < -10;
      if (canMove) {
        // (right : left) : (down : up)
        this.move(absDx > absDy ? (dx > 0 ? 1 : 3) : dy > 0 ? 2 : 0);
      }
    }
  }

  getRandomTiles() {
    const randomTiles = [];
    for (let i = 0; i < this.props.startTiles; i++) {
      randomTiles.push(this.getRandomTile());
    }
    return randomTiles;
  }

  getRandomTile() {
    const value = Math.random() < 0.9 ? 2 : 4;
    const pos = this.grid.randomPositionAvailableCell();
    const tile = new Tile(pos, value);
    this.grid.insertTile(tile);
    return {
      value: value,
      x: pos.x,
      y: pos.y,
      prog: tile.prog,
    };
  }

  continueGame() {
    this.won = false;
    this.over = false;
    this.setState({won: this.won, over: this.over});
  }

  restartGame = () => {
    storageManager.clearGameState();
    this.continueGame(); // Clear the game won/lost message
    this.setup();
  };

  // Keep playing after winning (allows going over 2048)
  keepGoing = () => {
    this.keepPlaying = true;
    this.continueGame(); // Clear the game won/lost message
  };

  // Return true if the game is lost, or has won and the user hasn't kept playing
  isGameTerminated() {
    return this.over || (this.won && !this.keepPlaying);
  }

  setGameStart = previousState => {
    // Reload the game from a previous game if present
    if (previousState) {
      this.grid = new Grid(previousState.grid.size, previousState.grid.cells); // Reload grid
      this.score = parseInt(previousState.score);
      this.over = previousState.over == true || previousState.over == 'true';
      this.won = previousState.won == true || previousState.won == 'true';
      this.keepPlaying =
        previousState.keepPlaying == true ||
        previousState.keepPlaying == 'true';
    } else {
      this.grid = new Grid(this.state.size);
      this.score = 0;
      this.over = false;
      this.won = false;
      this.keepPlaying = false;
    }
    storageManager.getBestScore(bestScore => {
      // Animate the update
      // LayoutAnimation.easeInEaseOut();
      this.setState({
        score: this.score,
        best: bestScore,
        tiles: this.getRandomTiles(),
        over: this.over,
        won: this.won,
      });
    });
  };

  // Set up the game
  setup = () => {
    this.setGameStart();
  };

  // Set up the initial tiles to start the game with
  addStartTiles() {
    for (let i = 0; i < this.startTiles; i++) {
      this.addRandomTile();
    }
  }

  // Adds a tile in a random position
  addRandomTile() {
    const cellsAvailable = this.grid.cellsAvailable();

    if (cellsAvailable) {
      const value = Math.random() < 0.9 ? 2 : 4;
      const tile = new Tile(this.grid.randomPositionAvailableCell(), value);

      this.grid.insertTile(tile);
    }
  }

  // Sends the updated grid to the actuator
  actuate() {
    // Clear the state when the game is over (game over only, not win)
    if (this.over) {
      storageManager.clearGameState();
    } else {
      storageManager.setGameState(this.serialize());
    }

    // this.actuator.actuate(this.grid, {
    //   score:      this.score,
    //   over:       this.over,
    //   won:        this.won,
    //   bestScore:  storageManager.getBestScore(),
    //   terminated: this.isGameTerminated()
    // });

    const tiles = [];
    this.grid.cells.forEach(function (column) {
      column.forEach(function (cell) {
        if (cell) {
          tiles.push({
            x: cell.x,
            y: cell.y,
            value: cell.value,
            prog: cell.prog,
          });
        }
      });
    });
    var _self = this;
    storageManager.getBestScore(function (bestScore) {
      // Animate the update
      // LayoutAnimation.easeInEaseOut();
      if (bestScore < _self.score) {
        storageManager.setBestScore(_self.score);
        _self.setState({
          score: _self.score,
          best: _self.score,
          tiles: tiles,
          won: _self.won,
          over: _self.over,
        });
      } else {
        _self.setState({
          score: _self.score,
          tiles: tiles,
          won: _self.won,
          over: _self.over,
        });
      }
    });
  }

  // Represent the current game as an object
  serialize() {
    return {
      grid: this.grid.serialize(),
      score: this.score,
      over: this.over,
      won: this.won,
      keepPlaying: this.keepPlaying,
    };
  }

  // Save all tile positions and remove merger info
  prepareTiles() {
    this.grid.eachCell(function (x, y, tile) {
      if (tile) {
        tile.mergedFrom = null;
        tile.savePosition();
      }
    });
  }

  // Move a tile and its representation
  moveTile(tile, cell) {
    this.grid.cells[tile.x][tile.y] = null;
    this.grid.cells[cell.x][cell.y] = tile;
    tile.updatePosition(cell);
  }

  // Move tiles on the grid in the specified direction
  move(direction) {
    // 0: up, 1: right, 2: down, 3: left
    var self = this;
    if (this.isGameTerminated()) return; // Don't do anything if the game's over
    var cell, tile;
    var vector = this.getVector(direction);
    var traversals = this.buildTraversals(vector);
    var moved = false;
    // Save the current tile positions and remove merger information
    this.prepareTiles();
    // Traverse the grid in the right direction and move tiles
    traversals.x.forEach(function (x) {
      traversals.y.forEach(function (y) {
        cell = {x: x, y: y};
        tile = self.grid.cellContent(cell);

        if (tile) {
          var positions = self.findFarthestPosition(cell, vector);
          var next = self.grid.cellContent(positions.next);

          // Only one merger per row traversal?
          if (next && next.value === tile.value && !next.mergedFrom) {
            var merged = new Tile(positions.next, tile.value * 2);
            merged.mergedFrom = [tile, next];

            self.grid.insertTile(merged);
            self.grid.removeTile(tile);

            // Converge the two tiles' positions
            tile.updatePosition(positions.next);

            // Update the score
            self.score += merged.value;

            // The mighty 2048 tile
            if (merged.value === 2048) self.won = true;
          } else {
            self.moveTile(tile, positions.farthest);
          }

          if (!self.positionsEqual(cell, tile)) {
            moved = true; // The tile moved from its original cell!
          }
        }
      });
    });

    if (moved) {
      this.addRandomTile();
      if (!this.movesAvailable()) {
        this.over = true; // Game over!
      }
      this.actuate();
    }
  }

  // Get the vector representing the chosen direction
  getVector(direction) {
    // Vectors representing tile movement
    const map = {
      0: {x: 0, y: -1}, // Up
      1: {x: 1, y: 0}, // Right
      2: {x: 0, y: 1}, // Down
      3: {x: -1, y: 0}, // Left
    };
    return map[direction];
  }

  // Build a list of positions to traverse in the right order
  buildTraversals(vector) {
    var traversals = {x: [], y: []};

    for (var pos = 0; pos < this.state.size; pos++) {
      traversals.x.push(pos);
      traversals.y.push(pos);
    }

    // Always traverse from the farthest cell in the chosen direction
    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();

    return traversals;
  }

  findFarthestPosition(cell, vector) {
    var previous;

    // Progress towards the vector direction until an obstacle is found
    do {
      previous = cell;
      cell = {x: previous.x + vector.x, y: previous.y + vector.y};
    } while (this.grid.withinBounds(cell) && this.grid.cellAvailable(cell));

    return {
      farthest: previous,
      next: cell, // Used to check if a merge is required
    };
  }

  movesAvailable() {
    return this.grid.cellsAvailable() || this.tileMatchesAvailable();
  }

  // Check for available matches between tiles (more expensive check)
  tileMatchesAvailable() {
    var self = this;

    var tile;

    for (var x = 0; x < this.state.size; x++) {
      for (var y = 0; y < this.state.size; y++) {
        tile = this.grid.cellContent({x: x, y: y});

        if (tile) {
          for (var direction = 0; direction < 4; direction++) {
            var vector = self.getVector(direction);
            var cell = {x: x + vector.x, y: y + vector.y};

            var other = self.grid.cellContent(cell);

            if (other && other.value === tile.value) {
              return true; // These two tiles can be merged
            }
          }
        }
      }
    }

    return false;
  }

  positionsEqual(first, second) {
    return first.x === second.x && first.y === second.y;
  }

  render() {
    return (
      <View style={styles.container}>
        <GameHeading
          currentScore={this.state.score}
          bestScore={this.state.best}
        />
        <AboveGame onRestartGame={this.restartGame} />
        <Animated.View {...this.panResponder.panHandlers}>
          <GameBoard
            size={this.state.size}
            tiles={this.state.tiles}
            won={this.state.won}
            over={this.state.over}
            onKeepGoing={this.keepGoing}
            onTryAgain={this.restartGame}
          />
        </Animated.View>
      </View>
    );
  }
}

export default GameContainer;
