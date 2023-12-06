import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Store } from '../../../core/store';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  constructor(private store: Store) {}

  getSessionMovies(): Observable<string[]> {
    return this.store.select<string[]>('mashupMovies').pipe(
        map((movies) => {
          return movies
      }))
  }
  getOptions(): Observable<string[]> {
    return this.store.select<string[]>('allMovies').pipe(
      map((movies) => {
        console.log(movies)
        return movies
    }))
  }
}