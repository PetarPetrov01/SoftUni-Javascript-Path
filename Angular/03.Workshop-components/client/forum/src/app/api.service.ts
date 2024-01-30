import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Theme } from './types/Theme';

@Injectable({
  providedIn: 'root',
})

export class ApiService {

  constructor(private http: HttpClient) {}

  getThemes (){
    const {appUrl} = environment;
    return this.http.get<Theme[]>(`${appUrl}/themes`);
  }
}
