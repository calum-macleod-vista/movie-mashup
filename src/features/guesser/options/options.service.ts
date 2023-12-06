import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Store } from '../../../core/store';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  constructor(private store: Store) {}
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];

  getSessionMovies(): Observable<string[]> {
    return this.store.select<string[]>('mashupMovies').pipe(
        map((movies) => {
          return movies
      }))
  }
  getOptions(): Observable<string[]> {
    return of(this.options);
  }
}