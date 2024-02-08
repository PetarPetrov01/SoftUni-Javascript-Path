import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { ThemesComponent } from './main/themes/themes.component';
import { NotFoundComponent } from './main/404/404.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AddThemeComponent } from './main/add-theme/add-theme.component';
import { IsUserGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'themes', component: ThemesComponent },
  {
    path: 'add-theme',
    component: AddThemeComponent,
    canActivate: [IsUserGuard],
  },
  { path: '**', component: NotFoundComponent },
];
