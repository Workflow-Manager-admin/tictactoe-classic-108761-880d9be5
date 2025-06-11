import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-tic-tac-toe-classic',
  templateUrl: './tic-tac-toe-classic.component.html',
  styleUrls: ['./tic-tac-toe-classic.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TicTacToeClassicComponent {
  /** 3x3 game board state: '' | 'X' | 'O' */
  board: string[][] = [];
  /** True if it's X turn, false if O */
  isXTurn = true;
  /** Winner "X"/"O" or null if not determined yet */
  winner: string | null = null;
  /** Has the game ended in a draw? */
  isDraw = false;
  /** True if the board is interactive */
  get isBoardActive(): boolean {
    return !this.winner && !this.isDraw;
  }

  /** On class construct, initialize game */
  constructor() {
    this.restart();
  }

  // PUBLIC_INTERFACE
  restart(): void {
    /** Reset the game state to defaults */
    this.board = Array.from({ length: 3 }, () => Array(3).fill(''));
    this.isXTurn = true;
    this.winner = null;
    this.isDraw = false;
  }

  // PUBLIC_INTERFACE
  makeMove(row: number, col: number): void {
    /** Player makes a move at board[row][col] */
    if (this.board[row][col] || this.winner || this.isDraw) {
      return; // Ignore invalid/moot clicks
    }
    this.board[row][col] = this.isXTurn ? 'X' : 'O';
    this.checkStatus();
    if (!this.winner && !this.isDraw) {
      this.isXTurn = !this.isXTurn;
    }
  }

  /** Checks for win or draw and updates winner/draw status */
  private checkStatus(): void {
    const winner = this.findWinner();
    if (winner) {
      this.winner = winner;
      this.isDraw = false;
      return;
    }
    // Check for draw (no empty squares left)
    const flat = this.board.flat();
    if (flat.every(cell => cell === 'X' || cell === 'O')) {
      this.winner = null;
      this.isDraw = true;
    }
  }

  /** Returns winner ("X"/"O") if found; otherwise null */
  private findWinner(): string | null {
    // Rows and columns
    for (let i = 0; i < 3; ++i) {
      // Rows
      if (
        this.board[i][0] &&
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2]
      ) {
        return this.board[i][0];
      }
      // Columns
      if (
        this.board[0][i] &&
        this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i]
      ) {
        return this.board[0][i];
      }
    }
    // Diagonals
    if (
      this.board[0][0] &&
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2]
    ) {
      return this.board[0][0];
    }
    if (
      this.board[0][2] &&
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0]
    ) {
      return this.board[0][2];
    }
    return null;
  }

  // PUBLIC_INTERFACE
  getDisplayStatus(): string {
    /** Returns user-facing game status string */
    if (this.winner) {
      return `Player ${this.winner} wins! 🎉`;
    }
    if (this.isDraw) {
      return `It's a draw!`;
    }
    return `Player ${this.isXTurn ? 'X' : 'O'}'s turn`;
  }

  // PUBLIC_INTERFACE
  getCellAriaLabel(row: number, col: number): string {
    /** Returns ARIA label for each cell */
    const val = this.board[row][col];
    if (val) return `Board cell, ${val}`;
    return `Board cell, empty`;
  }

  /** True if the board is totally empty */
  get isBoardEmpty(): boolean {
    return this.board.flat().every(cell => cell === '');
  }
}
