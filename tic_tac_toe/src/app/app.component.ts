import { Component } from '@angular/core';
import { TicTacToeClassicComponent } from './tic-tac-toe-classic.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TicTacToeClassicComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
