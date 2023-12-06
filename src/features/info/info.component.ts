import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { InfoModalComponent } from './info-modal/info-modal.component';

@Component({
    selector: 'mm-info',
    templateUrl: 'info.component.html',
    styleUrls: ['info.component.scss'],
    standalone: true,
    imports: [
        CommonModule, MatIconModule,
        MatButtonModule,
        MatDialogModule
    ]
})
export class InfoComponent {
  constructor(public dialog: MatDialog) {}

  
  openModal(): void {
    this.dialog.open(InfoModalComponent);
  }
}
