import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

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
  constructor() {}
  
}

// @Component({
//   selector: 'app-info-dialog',
//   template: `
//     <h2 mat-dialog-title>Information</h2>
//     <mat-dialog-content>
//       <p>This is some information...</p>
//     </mat-dialog-content>
//     <mat-dialog-actions>
//       <button mat-button mat-dialog-close>Close</button>
//     </mat-dialog-actions>
//   `,
// })
// export class InfoDialogComponent {}