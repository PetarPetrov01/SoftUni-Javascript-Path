import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../environments/environment.development';

const { appUrl } = environment;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith('/api')) {
      req = req.clone({
        url: req.url.replace('/api', appUrl),
        withCredentials: true,
      });
    }

    return next.handle(req).pipe(
      catchError((err) => {
        console.log(err);
        return [err];
      })
      );
  }
}
