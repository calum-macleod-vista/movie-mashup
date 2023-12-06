import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GuesserComponent } from '../features/guesser/guesser.component';
import { ClueListComponent } from '../features/clues/clue-list/clue-list.component';
import { CluePurchaseComponent } from '../features/clues/clue-purchase/clue-purchase.component';
import { CluePointsComponent } from '../features/clues/clue-points/clue-points.component';
import { TimerComponent } from '../features/timer/timer-component';
import { InfoComponent } from '../features/info/info.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, GuesserComponent, ClueListComponent, CluePurchaseComponent, CluePointsComponent, TimerComponent, InfoComponent]
})
export class AppComponent {
  title = 'movie-mashups';
}