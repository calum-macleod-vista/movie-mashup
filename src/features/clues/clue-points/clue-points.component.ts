import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClueManagerService } from '../clue-manager/clue-manager.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'mm-clue-points',
    templateUrl: 'clue-points.component.html',
    styleUrls: ['clue-points.component.scss'],
    standalone: true,
    imports: [
        CommonModule
    ]
})
  export class CluePointsComponent implements OnInit {
    
    public remainingPoints: Observable<number> | undefined;
    constructor(private clueManager: ClueManagerService) {}
  
    ngOnInit() {
        this.remainingPoints = this.clueManager.getRemainingPoints();
    }
  }