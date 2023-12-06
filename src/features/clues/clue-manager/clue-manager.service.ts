import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '../../../core/store';

@Injectable({
  providedIn: 'root'
})
export class ClueManagerService {

  options: string[] = ['Option 1', 'Option 2', 'Option 3'];

  constructor(private http: HttpClient, private store: Store) {}

  getOptions(): Observable<string[]> {
    return of(this.options);
  }

  getRemainingPoints(): Observable<number> {
    return of(1000);
  }

  getClueIds(): Observable<string[]> {
    return of(['clue1', 'clue2', 'clue3']);
  }

  getActiveClues(): Observable<Clue[]> {
    return this.store.select<Clue[]>('activeClues').pipe(
        map((clues) => {
          return clues
      }))
  }

  setActiveClues(clues: Clue[]): void {
    this.store.dispatch({type: 'SET_ACTIVE_CLUES', payload : clues})
  }

  getCluesForNewSession(): Observable<Clue[]> {
    return this.http.get<Clue[]>('/assets/clue-test.json').pipe(
        tap(clues => this.store.dispatch({type: 'SET_CLUES_FOR_SESSION', payload: clues}))
    );
  }
}

export interface Clue {
    id: string;
    media: MediaType;
    asset: string;
    key: string;
}

export type MediaType = 'image' | 'text' | 'audio' | 'richtext';
