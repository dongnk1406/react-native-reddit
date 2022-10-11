import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorageManager {
  constructor() {
    this.bestScoreKey = 'best_score_key';
    this.gameStateKey = 'game_state_key';
  }
  getItem = options => {
    AsyncStorage.getItem(options.key, (error, result) => {
      if (error) {
        options.error(error);
      } else {
        options.success(result);
      }
    });
  };
  setItem = options => {
    AsyncStorage.setItem(options.key, options.value, (error, result) => {
      if (error) {
        options.error(error);
      } else {
        options.success(result);
      }
    });
  };
  removeItem = options => {
    AsyncStorage.removeItem(options.key, (error, result) => {
      if (error) {
        options.error(error);
      } else {
        options.success(result);
      }
    });
  };
  // Best score getters/setters
  getBestScore = (callback = () => {}) => {
    this.getItem({
      key: this.bestScoreKey,
      success: result => {
        callback(result && !isNaN(result) ? parseInt(result) : 0);
      },
      error: error => {
        console.log(error);
      },
    });
  };
  setBestScore = (score, callback = () => {}) => {
    this.setItem({
      key: this.bestScoreKey,
      value: score.toString(),
      success: callback,
      error: error => {
        console.log(error);
      },
    });
  };
  // Game state getters/setters and clearing
  getGameState = (callback = () => {}) => {
    this.getItem({
      key: this.gameStateKey,
      success: result => {
        var state = result ? JSON.parse(result) : null;
        callback(state);
      },
      error: error => {
        console.log(error);
      },
    });
  };
  setGameState = (gameState, callback = () => {}) => {
    var json = gameState ? JSON.stringify(gameState) : null;
    this.setItem({
      key: this.gameStateKey,
      value: json,
      success: callback,
      error: error => {
        console.log(error);
      },
    });
  };
  clearGameState = (callback = () => {}) => {
    this.removeItem({
      key: this.gameStateKey,
      success: callback,
      error: error => {
        console.log(error);
      },
    });
  };

  importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const storage = await AsyncStorage.multiGet(keys);

      return {keys, storage};
    } catch (error) {
      console.error(error);
    }
  };
}

export default LocalStorageManager;
