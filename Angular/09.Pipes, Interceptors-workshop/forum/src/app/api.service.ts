import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Theme, ThemePopulated } from './types/Theme';
import { Post } from './types/Post';
import { observeOn } from 'rxjs';

const { appUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getThemes() {
    return this.http.get<Theme[]>(`${appUrl}/themes`);
  }

  getLatest(limit = 5) {
    return this.http.get<Post[]>(`/api/posts?limit=${limit}`);
  }

  getComments(themeId: string) {
    return this.http.get<ThemePopulated>(`${appUrl}/themes/${themeId}`);
  }
  
  createTheme(themeName: string, postText: string) {
    return this.http.post(`/api/themes`, { themeName, postText });
  }
}
