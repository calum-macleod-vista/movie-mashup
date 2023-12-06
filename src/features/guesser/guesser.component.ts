import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {first, map, startWith, take} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {OptionsService} from './options/options.service';
import { MOVIES_LIST } from '../../assets/movies-list';
import { ClueManagerService } from '../clues/clue-manager/clue-manager.service';


@Component({
    selector: 'mm-guesser',
    templateUrl: 'guesser.component.html',
    styleUrls: ['guesser.component.scss'],
    standalone: true,
    imports: [
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatAutocompleteModule,
      ReactiveFormsModule,
      AsyncPipe,
    ],
  })
  export class GuesserComponent implements OnInit {
    public guesserControl = new FormControl('');
    public options: string[] = [...MOVIES_LIST];
    public filteredOptions: Observable<string[]> | undefined;
    public movies$: Observable<string[]> | undefined;
    public correctGuessCount$: Observable<number> | undefined;
    constructor(private optionsService: OptionsService, private clueManagerService: ClueManagerService) {}
  
    ngOnInit() {
    
        this.filteredOptions = this.guesserControl.valueChanges.pipe(
            startWith(''),
            map(value => {
              return this._filter(value || '');
            }),
          );

      this.movies$ = this.optionsService.getSessionMovies();

      this.correctGuessCount$ = this.clueManagerService.getCorrectGuesses().pipe(
        map((guesses) => {
          return guesses.length
      })
      );
    }
    onOptionSelected(event: MatAutocompleteSelectedEvent): void {
      this.checkGuess(event.option.value); // replace with your function
  }

  checkGuess(guess: string): void {
    this.movies$?.pipe(take(1)).subscribe(stringList => {
        if (stringList.includes(guess ?? '')) {
            this.clueManagerService.setCorrectGuesses(this.guesserControl.value ?? '');
            this.guesserControl.reset();
        } else {
            console.log('Incorrect guess.');
            this.clueManagerService.updatePoints(50);
            // Implement logic for an incorrect guess here
        }
    });
}

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
  }