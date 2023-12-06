import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {OptionsService} from './options/options.service';


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
      AsyncPipe
    ],
  })
  export class GuesserComponent implements OnInit {
    public guesserControl = new FormControl('');
    public options: string[] = ['Happy Gilmore', 'Persona', 'Paw Patrol'];
    public filteredOptions: Observable<string[]> | undefined;

    constructor(private optionsService: OptionsService) {}
  
    ngOnInit() {
        this.optionsService.getOptions().pipe(
            map((options) => {
                this.options = options;
            })
        )
    
      this.filteredOptions = this.guesserControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    }
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
  }