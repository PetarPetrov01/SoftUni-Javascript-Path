import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { People } from '../types/people';
import { Character } from '../types/character';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  baseUrl = 'https://swapi.dev/api/';

  constructor(private http: HttpClient) {}

  getPeople (){
    return this.http.get<People>(`${this.baseUrl}people`)
  }

  getCharacter (id: string){
    return this.http.get<Character>(`${this.baseUrl}people/${id}`)
  }
}
