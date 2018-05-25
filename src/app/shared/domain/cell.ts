import * as _ from 'lodash';

export default class Cell {
  public alive: boolean;
  public aliveNextGeneration: boolean;
  public neighbours: any[];
  public xCoord: number;
  public yCoord: number;
  public cellColor: string;

  constructor(x = 0, y = 0) {
    this.alive = false;
    this.aliveNextGeneration = false;
    this.neighbours = [];
    this.xCoord = x;
    this.yCoord = y;
  }

  checkNextGenerationStatus() {
    this.aliveNextGeneration = this.alive ? this.shouldDieOrLive() : this.shouldRebirth();
  }

  setNextGenerationStatus() {
    this.alive = this.aliveNextGeneration;
  }

  findNeighbours(cells) {
    // surrounding neighbours are those within 1 cell distance (based on X and Y coords)
    _.filter(cells, (anotherCell: Cell) => {
      if (Math.abs(this.xCoord - anotherCell.xCoord) <= 1
        && Math.abs(this.yCoord - anotherCell.yCoord) <= 1) {
        if (!(this.xCoord == anotherCell.xCoord && this.yCoord == anotherCell.yCoord)) {
          this.neighbours.push(anotherCell);
        }
      }
    });
  }

  shouldRebirth() {
    // if currently dead and exactly 3 neighbours alive, then rebirth
    const aliveNeighbours = this.getAliveNeighbours();
    return aliveNeighbours.length == 3 ? true : false;
  }

  shouldDieOrLive() {
    // if currently alive and has 2 or 3 alive neighbours, cell stays alive; else, cell dies
    const aliveNeighbours = this.getAliveNeighbours();
    if (aliveNeighbours.length < 2 || aliveNeighbours.length > 3) {
      return false;
    } else return true;
  }

  getAliveNeighbours() {
    return _.filter(this.neighbours, { alive: true });
  }
}
