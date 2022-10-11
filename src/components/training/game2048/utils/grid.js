import Tile from './tile';

class Grid {
  constructor(size, previousState) {
    this.size = size;
    this.cells = previousState
      ? this.createGridFromStateCell(previousState)
      : this.createGridEmptyCell();
  }

  // Build an empty matrix of the specified size
  createGridEmptyCell() {
    const cells = [];

    for (let x = 0; x < this.size; x++) {
      const row = (cells[x] = []);

      for (let y = 0; y < this.size; y++) {
        row.push(null);
      }
    }

    return cells;
  }

  // Build an empty remain matrix of the specified size from state
  createGridFromStateCell(state = []) {
    const cells = [];

    for (let x = 0; x < this.size; x++) {
      const row = (cells[x] = []);

      for (let y = 0; y < this.size; y++) {
        const tile = state[x][y];
        row.push(tile ? new Tile(tile.position, tile.value) : null);
      }
    }

    return cells;
  }

  // find array available cells
  availableCells() {
    const cells = [];

    this.eachCell((x, y, tile) => {
      if (!tile) {
        cells.push({x: x, y: y});
      }
    });

    return cells;
  }

  // Call callback for every cell
  eachCell(callback) {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        callback(x, y, this.cells[x][y]);
      }
    }
  }

  // Find the first available random position
  randomPositionAvailableCell() {
    const cells = this.availableCells();

    if (cells.length) {
      return cells[Math.floor(Math.random() * cells.length)];
    }
  }

  // Check if there are any cells available
  cellsAvailable() {
    return !!this.availableCells().length;
  }

  // Check if the specified cell is taken
  cellAvailable(cell) {
    return !this.cellOccupied(cell);
  }

  cellOccupied(cell) {
    return !!this.cellContent(cell);
  }

  cellContent(cell = {}) {
    if (this.withinBounds(cell)) {
      return this.cells[cell.x][cell.y];
    } else {
      return null;
    }
  }

  // Inserts a tile at its position
  insertTile(tile = {}) {
    this.cells[tile.x][tile.y] = tile;
    // console.log(this.toString());
  }

  removeTile(tile = {}) {
    this.cells[tile.x][tile.y] = null;
  }

  withinBounds(position) {
    return (
      position.x >= 0 &&
      position.x < this.size &&
      position.y >= 0 &&
      position.y < this.size
    );
  }

  toString() {
    const ret = [];
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        ret.push(this.cells[x][y] ? this.cells[x][y].value : '·');
      }
      ret.push('\n');
    }
    return ret.join('');
  }

  serialize() {
    const cellState = [];

    for (let x = 0; x < this.size; x++) {
      const row = (cellState[x] = []);

      for (let y = 0; y < this.size; y++) {
        row.push(this.cells[x][y] ? this.cells[x][y].serialize() : null);
      }
    }

    return {
      size: this.size,
      cells: cellState,
    };
  }
}

export default Grid;
