import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Clue, ClueManagerService } from '../../../clues/clue-manager/clue-manager.service';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'mm-info-modal-clue-list-item',
    templateUrl: 'info-modal-clue-list-item.component.html',
    styleUrls: ['info-modal-clue-list-item.component.scss'],
    standalone: true,
    imports: [
        CommonModule, MatIconModule,
        MatButtonModule,
        MatDialogModule
    ]
})

export class InfoModalClueListItemComponent implements OnInit {
 
  @Input() clue: Clue | undefined;
  
  public buttonText$: Observable<string> | undefined; 
public clueText: string | undefined;
  constructor(private clueManager: ClueManagerService) {}

  ngOnInit(): void {
    this.buttonText$ = this.clueManager.getActiveClues().pipe(
        map(clues => {
            return clues.some(clue => clue.id == this.clue?.id) ? 'Used' : 'Add'
        })
    )
}
  
  public addThisClue(clue: Clue) {
    this.clueManager.addActiveClue(clue.key);
    this.clueManager.updatePoints(clue?.points);
  }
}

