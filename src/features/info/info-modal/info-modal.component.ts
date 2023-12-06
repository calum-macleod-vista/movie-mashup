import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Clue, ClueManagerService } from '../../clues/clue-manager/clue-manager.service';
import { InfoModalClueListItemComponent } from "./info-modal-clue-list-item/info-modal-clue-list-item.component";

@Component({
    selector: 'mm-info-modal',
    templateUrl: 'info-modal.component.html',
    styleUrls: ['info-modal.component.scss'],
    standalone: true,
    imports: [
        CommonModule, MatIconModule,
        MatButtonModule,
        MatDialogModule,
        InfoModalClueListItemComponent,
        MatDividerModule
    ]
})
export class InfoModalComponent {
  constructor(public dialogRef: MatDialogRef<InfoModalComponent>, private clueManager: ClueManagerService) {}
  public clues$ = this.clueManager.getSessionClues();
  
  
  public addThisClue(clue: Clue) {
    this.clueManager.addActiveClue(clue.key);
    this.clueManager.updatePoints(clue?.points);
  }
  
  onClose(): void {
    this.dialogRef.close();
  }
}
