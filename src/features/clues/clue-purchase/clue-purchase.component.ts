import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
    selector: 'mm-clue-purchase',
    templateUrl: 'clue-purchase.component.html',
    styleUrls: ['clue-purchase.component.scss'],
    standalone: true,
    imports: [
        CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule
    ]
})
  export class CluePurchaseComponent implements OnInit {
    clues: CluePurchase[] = [
      {value: 'trailer-text', viewValue: 'Trailer Text', points: 100},
      {value: 'trailer-audio', viewValue: 'Trailer Audio', points: 100},
      {value: 'poster', viewValue: 'Poster', points: 100},
    ];
    constructor() {}
  
    ngOnInit() {
    
    }
  }




interface CluePurchase {
  value: string;
  viewValue: string;
  points?: number;
}
