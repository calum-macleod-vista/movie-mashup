import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  options: string[] = ['Option 1', 'Option 2', 'Option 3'];

  constructor() { }

  getOptions(): Observable<string[]> {
    return of(this.options);
  }
}