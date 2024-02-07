import { Routes } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { PlanetsComponent } from './planets/planets.component';

export const routes: Routes = [
  { path: '', component: PeopleComponent },
  {
    path: 'people',
    loadChildren: () => import('../app/people/people.routes').then(r => r.PEOPLE_ROUTES),
  },
  { path: 'planets', component: PlanetsComponent },
];
