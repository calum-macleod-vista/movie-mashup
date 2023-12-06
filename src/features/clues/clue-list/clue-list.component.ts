import {Component, OnInit} from '@angular/core';
import { ClueListItemComponent } from "./clue-list-item/clue-list-item.component";
import { CommonModule } from '@angular/common';

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
    constructor() {}
  
    ngOnInit() {
    
    }
  }