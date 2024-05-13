import { Injectable } from '@angular/core';
import { Observable, filter, map, of, switchMap, tap } from 'rxjs';
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

  getGiveUp(): Observable<boolean> {
    return this.store.select<boolean>('giveUp').pipe(
      map((giveUp) => {
        return giveUp
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
    const seed = this.getRandomInt(1,90);
    return this.http.get<Movie[]>('/assets/movies.json').pipe(
      switchMap(movies => {
        const movie = movies.find(m => m.id === seed);
        if (movie) {
          return this.http.get<MovieTemplate>('/assets/movie-template.json').pipe(
            map(template => {
              const movieMashups = movie.films.split('|');
  
              const clues = template.clues.map(clue => {
                let asset;
                if (clue.key === 'synopsis') {
                  asset = movie.pitch; 
                } else if (clue.key === 'tagline') {
                  asset = movie.tagline; 
                } else {
                  asset = clue.asset.replace('__', movie.id.toString());
                }
                return {
                  ...clue,
                  asset: asset
                };
              });
  
              this.store.dispatch({ type: 'SET_CLUES_FOR_SESSION', payload: clues });
              this.store.dispatch({ type: 'SET_MOVIES_FOR_SESSION', payload: movieMashups });
              this.store.dispatch({ type: 'SET_TITLE_FOR_SESSION', payload: movie.title });
  
              return movie;
            })
          );
        } else {
          // Movie not found, retry
          return this.setCluesForNewSession();
        }
      }
    ));
  }

  getAnswers(): Observable<string> {
    return this.store.select<string[]>('mashupMovies').pipe(
      map((mashupMovies) => {
        return mashupMovies.join(', ');
    }))
  }

  updatePoints(points: number): void {
    this.store.dispatch({type: 'UPDATE_POINTS', payload: points})
  }

  resetPoints(): void {
    this.store.dispatch({type: 'RESET_POINTS'})
  }

  resetGame (): void {
    this.setCluesForNewSession();
    this.store.dispatch({type: 'RESET'})
  }
  giveUp (): void {
    this.store.dispatch({type: 'GIVE_UP'})
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
}
export interface Movie {
  id: number;
  clues: Clue[];
  title: string;
  films: string;
  pitch: string;
  tagline: string;
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
export interface MovieTemplate {
  clues: Clue[];
}

export type MediaType = 'image' | 'text' | 'audio' | 'richtext';
