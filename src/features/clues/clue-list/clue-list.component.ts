import {Component, OnInit} from '@angular/core';
import { ClueListItemComponent } from "./clue-list-item/clue-list-item.component";
import { CommonModule } from '@angular/common';
import { Store } from '../../../core/store';
import { Observable, combineLatest, concat, map, of, switchMap } from 'rxjs';
import { Clue, ClueManagerService } from '../clue-manager/clue-manager.service';
import { MediaType } from '../clue-manager/clue-manager.service';
import { InfoModalClueListItemComponent } from "../../info/info-modal/info-modal-clue-list-item/info-modal-clue-list-item.component";
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'mm-clue-list',
    templateUrl: 'clue-list.component.html',
    styleUrls: ['clue-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule, ClueListItemComponent,
        InfoModalClueListItemComponent, MatButtonModule
    ]
})
  export class ClueListComponent implements OnInit {
    public clues$: Observable<Clue[]> | undefined;
    public title$: Observable<string> | undefined;
    public answers$: Observable<string> | undefined;
    public hiddenClues$: Observable<Clue[]> | undefined;
    public hiddenListToggle = false;
    public giveUpToggle = false;
    public giveUp$ : Observable<boolean> = of(false);
    constructor(private clueManager: ClueManagerService) {}

    public toggleHiddenList() {
      this.hiddenListToggle = !this.hiddenListToggle;
    }

    public giveUp() {
      this.clueManager.resetPoints();
      this.clueManager.giveUp();
      this.giveUpToggle = true;
    }

    public newGame() {
      this.resetGame();
    }
  
    ngOnInit() {
      this.setupGame();
    }
  
    setupGame() {
      this.clues$ = concat(
        this.clueManager.setCluesForNewSession().pipe(
          switchMap(() => this.clueManager.getActiveClues())
        ),
        this.clueManager.getActiveClues()
      );
      this.clueManager.resetPoints();
      this.title$ = this.clueManager.getSessionTitle();
      this.answers$ = this.clueManager.getAnswers();
  
      this.hiddenClues$ = combineLatest([
        this.clueManager.getSessionClues(),
        this.clues$
      ]).pipe(
        map(([sessionClues, activeClues]) => {
          return sessionClues.filter(sessionClue => !activeClues.includes(sessionClue));
        })
      );
      this.giveUp$ = this.clueManager.getGiveUp();
    }
  
    resetGame() {
      this.setupGame();
    }

    
}