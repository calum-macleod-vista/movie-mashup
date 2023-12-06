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
    return this.store.select<number>('points').pipe(
      map((points) => {
        return points
    }))
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

  getSessionClues(): Observable<Clue[]> {
    return this.store.select<Clue[]>('sessionClues').pipe(
        map((clues) => {
          return clues
      }))
  }

  addActiveClue(key: string): void {
    this.store.dispatch({type: 'ADD_ACTIVE_CLUE', payload : key})
  }

  setActiveClues(clues: Clue[]): void {
    this.store.dispatch({type: 'SET_ACTIVE_CLUES', payload : clues})
  }

  setCluesForNewSession(): Observable<Clue[]> {
    return this.http.get<Clue[]>('/assets/clue-test.json').pipe(
        tap(clues => this.store.dispatch({type: 'SET_CLUES_FOR_SESSION', payload: clues}))
    );
  }

  updatePoints(points: number): void {
    this.store.dispatch({type: 'UPDATE_POINTS', payload: points})
  }
}

export interface Clue {
    id: string;
    media: MediaType;
    asset: string;
    key: string;
    points: number;
    description: string;
}

export type MediaType = 'image' | 'text' | 'audio' | 'richtext';
