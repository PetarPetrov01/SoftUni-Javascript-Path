import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {

  constructor() { }

  generateId(): string {
    const initialId = Date.now().toString(16) + Math.random().toString(16).substring(2)
    return initialId.slice(0, 20)
  }
}
