import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Planets } from '../types/planet';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  constructor(private http: HttpClient) {}

  getPlanets() {
    return this.http.get<Planets>('https://swapi.dev/api/planets');
  }
}
