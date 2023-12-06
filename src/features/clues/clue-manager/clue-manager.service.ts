import { Injectable } from '@angular/core';
import { Observable, filter, map, of, tap } from 'rxjs';
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

  getCorrectGuesses(): Observable<string[]> {
    return this.store.select<string[]>('correctGuesses').pipe(
        map((clues) => {
          console.log(clues)
          return clues
      }))
  }

  getSessionClues(): Observable<Clue[]> {
    return this.store.select<Clue[]>('sessionClues').pipe(
        map((clues) => {
          return clues
      }))
  }

  getSessionTitle(): Observable<string> {
    return this.store.select<string>('title').pipe(
        map((title) => {
          return title
      }))
  }

  addActiveClue(key: string): void {
    this.store.dispatch({type: 'ADD_ACTIVE_CLUE', payload : key})
  }

  setActiveClues(clues: Clue[]): void {
    this.store.dispatch({type: 'SET_ACTIVE_CLUES', payload : clues})
  }

  setCorrectGuesses(guess: string): void {
    this.store.dispatch({type: 'SET_CORRECT_GUESS', payload : guess})
  }

  setCluesForNewSession(): Observable<Movie> {
    return this.http.get<Movie>('/assets/clue-test-2.json').pipe(
        tap(movie => 
          {
            this.store.dispatch({type: 'SET_CLUES_FOR_SESSION', payload: movie.clues})
            this.store.dispatch({type: 'SET_MOVIES_FOR_SESSION', payload: movie.movieMashups})
            this.store.dispatch({type: 'SET_TITLE_FOR_SESSION', payload: movie.title})
          }
          ))
  }

  updatePoints(points: number): void {
    this.store.dispatch({type: 'UPDATE_POINTS', payload: points})
  }
}
export interface Movie {
  clues: Clue[];
  title: string;
  movieMashups: string[];
}
export interface Clue {
    id: string;
    media: MediaType;
    asset: string;
    key: string;
    points: number;
    description: string;
    cardHeight: string;
}

export type MediaType = 'image' | 'text' | 'audio' | 'richtext';
