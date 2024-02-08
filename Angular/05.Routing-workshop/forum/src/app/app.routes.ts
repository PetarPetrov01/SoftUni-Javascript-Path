import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { ThemesComponent } from './main/themes/themes.component';
import { NotFoundComponent } from './main/404/404.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'themes', component: ThemesComponent },
  { path: '**', component: NotFoundComponent },
];
