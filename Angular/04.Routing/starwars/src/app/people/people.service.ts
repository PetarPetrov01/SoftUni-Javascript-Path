import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { People } from '../types/people';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  baseUrl = 'https://swapi.dev/api/';

  constructor(private http: HttpClient) {}

  getPeople (){
    return this.http.get<People>(`${this.baseUrl}people`)
  }
}
