import { CharacterComponent } from './character/character.component';
import { PeopleComponent } from './people.component';

export const PEOPLE_ROUTES = [
  { path: '', component: PeopleComponent },
  { path: ':id', component: CharacterComponent },
];
