import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GuesserComponent } from '../features/guesser/guesser.component';
import { ClueListComponent } from '../features/clues/clue-list/clue-list.component';
import { CluePointsComponent } from '../features/clues/clue-points/clue-points.component';
import { InfoComponent } from '../features/info/info.component';
import { AnimationsComponent } from '../features/animations/animations.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, GuesserComponent, ClueListComponent, CluePointsComponent, InfoComponent, AnimationsComponent]
})
export class AppComponent {
  title = 'movie-mashups';
}
