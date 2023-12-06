import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClueManagerService {

  options: string[] = ['Option 1', 'Option 2', 'Option 3'];

  constructor(private http: HttpClient) {}

  getOptions(): Observable<string[]> {
    return of(this.options);
  }

  getRemainingPoints(): Observable<number> {
    return of(1000);
  }

  getClueIds(): Observable<string[]> {
    return of(['clue1', 'clue2', 'clue3']);
  }

  getAllClues(): Observable<Clue[]> {
    return this.http.get<Clue[]>('./clue-test.json');
  }
}

export interface Clue {
    id: string;
    media: MediaType;
    asset: string;
}

export type MediaType = 'image' | 'text' | 'audio' | 'richtext';
