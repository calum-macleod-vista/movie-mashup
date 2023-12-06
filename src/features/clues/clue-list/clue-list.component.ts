import {Component, OnInit} from '@angular/core';
import { ClueListItemComponent } from "./clue-list-item/clue-list-item.component";
import { CommonModule } from '@angular/common';
import { Store } from '../../../core/store';
import { Observable, concat, map, switchMap } from 'rxjs';
import { Clue, ClueManagerService } from '../clue-manager/clue-manager.service';
import { MediaType } from '../clue-manager/clue-manager.service';

@Component({
    selector: 'mm-clue-list',
    templateUrl: 'clue-list.component.html',
    styleUrls: ['clue-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule, ClueListItemComponent
    ]
})
  export class ClueListComponent implements OnInit {
    public clues$: Observable<Clue[]> | undefined;

    constructor(private clueManager: ClueManagerService) {

    }
  
    ngOnInit() {
      this.clues$ = concat(
        this.clueManager.setCluesForNewSession().pipe(
          switchMap(() => this.clueManager.getActiveClues())
        ),
        this.clueManager.getActiveClues()
      );
    }
  }