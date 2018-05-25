import { Component, OnInit } from '@angular/core';
import Game from '../shared/domain/game';
import Cell from '../shared/domain/cell';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.scss']
})
export class GameOfLifeComponent implements OnInit {
  public game: Game;
  public intervalTime: number;
  public gameRunning: boolean;
  public playing: Observable<any>;
  public sub: Subscription;

  constructor() { }

  ngOnInit() {
    this.game = new Game(50, 50);
    this.gameRunning = false;
    this.intervalTime = 1000;
    this.playing = Observable.interval(this.intervalTime);
  }

  /**
   * Function to increase the speed of the game (meaning, lower interval)
   * Resets the Observable interval with the new value
   */
  increaseSpeed() {
    this.intervalTime -= 100;

    if (this.gameRunning) {
      this.sub.unsubscribe();
      this.gameRunning = !this.gameRunning;
    }
    this.playing = Observable.interval(this.intervalTime);
    this.toggleGame();
  }

  /**
   * Function to decrease the speed of the game (meaning, higher interval)
   * Resets the Observable interval with the new value
   */
  decreaseSpeed() {
    this.intervalTime += 100;

    if (this.gameRunning) {
      this.sub.unsubscribe();
      this.gameRunning = !this.gameRunning;
    }
    this.playing = Observable.interval(this.intervalTime);
    this.toggleGame();
  }

  /**
   * Function to start/stop the game based on its current state
   */
  toggleGame() {
    if (this.gameRunning) {
      this.sub.unsubscribe();
    } else {

      this.sub = this.playing.subscribe(generation => {
        this.game.nextGeneration();
      });
    }

    this.gameRunning = !this.gameRunning;
  }

  /**
   * Function to switch a cell's state between dead and alive
   */
  toggleCell(cell: Cell) {
    cell.alive = !cell.alive;
  }

  /**
   * Function to blank all states of the game (alive cells, generation, etc)
   */
  resetGame() {
    if (this.gameRunning) {
      this.sub.unsubscribe();
      this.gameRunning = false;
    }
    this.game = new Game(50, 50);
  }

}
