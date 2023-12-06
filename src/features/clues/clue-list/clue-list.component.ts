import {Component, OnInit} from '@angular/core';
import { ClueListItemComponent } from "./clue-list-item/clue-list-item.component";
import { CommonModule } from '@angular/common';
import { Store } from '../../../core/store';
import { Observable, map } from 'rxjs';
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
    public numbers: number[] = Array.from({length: 50}, (_, i) => i + 1);
    public clues$: Observable<Clue[]> | undefined;

    constructor(private store: Store, private clueManager: ClueManagerService) {

    }
  
    ngOnInit() {
      this.clueManager.getCluesForNewSession().subscribe(clues => {
          this.store.dispatch({type: 'SET_CLUES_FOR_SESSION', payload: clues});
          this.clues$ = this.store.select<Clue[]>('sessionClues');
      });

      this.clues$?.pipe(
        map(clues => console.log(clues))
      )
  }
        

  }