import {Component, Input, OnInit} from '@angular/core';
import { Clue } from '../../clue-manager/clue-manager.service';

@Component({
    selector: 'mm-clue-list-item',
    templateUrl: 'clue-list-item.component.html',
    styleUrls: ['clue-list-item.component.scss'],
    standalone: true,
    imports: [
    ],
  })
  export class ClueListItemComponent implements OnInit {

    @Input()
    public clue: Clue | undefined;
    
    constructor() {}
  
    ngOnInit() {
    
    }
  }