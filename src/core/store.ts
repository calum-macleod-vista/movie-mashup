import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Clue } from '../features/clues/clue-manager/clue-manager.service';

interface State {
  sessionClues: Clue[];
  activeClues: Clue[];
  mashupMovies: string[];
  points: number;
}

const initialState: State = {
    sessionClues: [],
    activeClues: [],
    mashupMovies: [],
    points: 1000
};

@Injectable({
  providedIn: 'root',
})
export class Store {
  private _state$ = new BehaviorSubject<State>(initialState);
  state$ = this._state$.asObservable();

  dispatch(action: Action) {
    console.log(action.type)
    console.log(action.payload)
    this._state$.next(reducer(this._state$.value, action));
  }

  select<T>(name: keyof State): Observable<T> {
    console.log("select" + name)
    
    return this.state$.pipe(map(state => state[name] as T));
}
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
  case 'SET_CLUES_FOR_SESSION':
    console.log({
      ...state,
      sessionClues: action.payload
    })
    return {
      ...state,
      sessionClues: action.payload,
      activeClues: action.payload.filter((clue: { key: string; }) => clue.key === 'synopsis')
    }
  case 'ADD_ACTIVE_CLUE':
    console.log({
      ...state,
      activeClues: action.payload
    })
    return {
      ...state,
      activeClues: [...state.activeClues, ...state.sessionClues.filter(clue => clue.key === action.payload)]
    }
    case 'UPDATE_POINTS':
    return {
      ...state,
      points: state.points - action.payload
    }
  default:
    return state;
  }
}

export interface Action {
    type: string;
    payload?: any;
}