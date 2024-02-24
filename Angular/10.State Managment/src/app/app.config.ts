import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { posts1Reducer } from './posts1/posts1.reducer';
import { postReducer2 } from './posts2/posts2.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'post1', reducer: posts1Reducer }),
    provideState({ name: 'post2', reducer: postReducer2 }),
  ],
};
