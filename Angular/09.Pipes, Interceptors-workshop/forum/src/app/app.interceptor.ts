import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../environments/environment.development';
import { Router } from '@angular/router';
import { ErrorService } from './error/error.service';
// import { ErrorService } from './error/error.service';

const { appUrl } = environment;
const authorizedRoutes =['/api']

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private router: Router, private errorService: ErrorService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    //POST => true; GET && url==profile => true;
    const includeCredentials = req.method!='GET' || req.url.includes('/users/profile')

    if (req.url.startsWith('/api')) {
      req = req.clone({
        url: req.url.replace('/api', appUrl),
        withCredentials: includeCredentials,
      });
      console.log('from interceptor');
      console.log(req);
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          req.url.includes('/users/profile')? null : this.router.navigate(['/login'])
        } else {
          this.errorService.setError(err);
        }
        return [err];
      })
    );
  }
}

export const appInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true,
};
