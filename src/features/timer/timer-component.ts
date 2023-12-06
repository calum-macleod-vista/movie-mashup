import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'mm-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  imports: [CommonModule ]
})
export class TimerComponent implements OnInit {
  public countDown$: Observable<{ minutes: number; seconds: number; }> | undefined;

  ngOnInit() {
    this.startCountdown(2);
  }

  startCountdown(minutes: number) {
    const countdownDate = new Date().getTime() + minutes * 60 * 1000;

    this.countDown$ = timer(0, 1000).pipe(
      map(() => {
        const distance = countdownDate - new Date().getTime();
        return {
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        };
      }),
      takeWhile(({ minutes, seconds }) => minutes >= 0 && seconds >= 0)
    );
  }
}
