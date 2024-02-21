import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: User | undefined;
  USER_KEY = '[user]';

  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.subscription = this.user$$.subscribe((user) => {
      this.user = user;
    });
  }

  get isLogged(): boolean {
    return !!this.user;
  }

  login(email: string, password: string) {
    return this.http
      .post<User>('/api/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string,
    tel: string
  ) {
    return this.http
      .post<User>('/api/register', {
        username,
        email,
        password,
        rePassword,
        tel,
      })
      .pipe(
        tap((user) => {
          this.user$$.next(user);
        })
      );
  }

  logout() {
    return this.http
      .post<User>('/api/logout', {})
      .pipe(tap((user) => this.user$$.next(undefined)));
  }

  getProfile() {
    return this.http
      .get<User>('/api/users/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  updateProfile(username: string, email: string, tel: string) {
    console.log('from service')
    console.log(username)
    return this.http
      .put<User>('/api/users/profile', {
        username,
        email,
        tel,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }
}
