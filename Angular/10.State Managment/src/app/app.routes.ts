import { Routes } from '@angular/router';
import { Posts1Component } from './posts1/posts1.component';
import { Posts2Component } from './posts2/posts2.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'posts1' },
  { path: 'posts1', component: Posts1Component },
  { path: 'posts2', component: Posts2Component },
];
