import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Clue, ClueManagerService } from '../../../clues/clue-manager/clue-manager.service';

@Component({
    selector: 'mm-info-modal-clue-list-item',
    templateUrl: 'info-modal-clue-list-item.component.html',
    styleUrls: ['info-modal-clue-list-item.component.scss'],
    standalone: true,
    imports: [
        CommonModule, MatIconModule,
        MatButtonModule,
        MatDialogModule,
    ]
})

export class InfoModalClueListItemComponent {
 
  @Input() clue: Clue | undefined;
  
  public clueText: string | undefined;
  constructor(private clueManager: ClueManagerService) {}

  
  public addThisClue(clue: Clue) {
    this.clueManager.addActiveClue(clue.key);
    this.clueManager.updatePoints(clue?.points);
  }
}

