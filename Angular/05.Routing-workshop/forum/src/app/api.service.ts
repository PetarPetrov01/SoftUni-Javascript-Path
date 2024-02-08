import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Theme, ThemePopulated } from './types/Theme';
import { Post } from './types/Post';

@Injectable({
  providedIn: 'root',
})

export class ApiService {

  constructor(private http: HttpClient) {}

  getThemes (){
    const {appUrl} = environment;
    return this.http.get<Theme[]>(`${appUrl}/themes`);
  }

  getLatest(){
    const {appUrl} = environment;
    return this.http.get<Post[]>(`${appUrl}/posts`)
  }
  
  getComments(themeId: string){
    const {appUrl} = environment;
    return this.http.get<ThemePopulated>(`${appUrl}/themes/${themeId}`)
  }
}
