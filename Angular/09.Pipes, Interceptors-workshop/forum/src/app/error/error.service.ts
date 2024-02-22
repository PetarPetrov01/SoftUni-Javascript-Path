import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private apiError$$ = new BehaviorSubject(null);
  public error$ = this.apiError$$.asObservable();
  
  constructor() {}

  setError(err: any) {
    this.apiError$$.next(err);    
  }
}
