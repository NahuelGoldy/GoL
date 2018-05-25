import Cell from './cell';
import * as _ from 'lodash';

export default class Game {
  public board: any[] = [];
  public rows: number;
  public columns: number;
  public generation: number;
  public cells: Cell[];

  constructor(rows = 0, columns = 0) {
    this.rows = rows;
    this.columns = columns;
    this.generation = 0;
    this.cells = this.createCells();
  }

  /**
   * Function to evaluate the next generation status for each cell, and then update the whole population accordingly
   */
  nextGeneration() {
    _.map(this.cells, (cell) => {
      cell.checkNextGenerationStatus();
    });

    this.generation++;

    _.map(this.cells, (cell) => {
      cell.setNextGenerationStatus();
    });
  }

  /**
   * Function to initialize cells of the whole game, which is returned
   * @returns Cell[]
   */
  createCells() {
    let x = 0;
    let y = 0;
    let cells: Cell[] = [];
    let row: Cell[] = [];
    while (y < this.columns) {
      if (x == this.rows) {
        y++;
        x = 0;
        this.board.push(row);
        row = [];
      }

      if (y == this.columns) {
        _.map(cells, (cell: Cell) => {
          cell.findNeighbours(cells);
        });
        return cells;
      }

      const cell = new Cell(x, y);
      cells.push(cell);
      row.push(cell);

      x++;
    }
  }
}
