import { Routes } from '@angular/router';
import { CreateFormComponent } from './create-form/create-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

export const routes: Routes = [
    {path:'create', component: CreateFormComponent},
    {path:'reactive', component: ReactiveFormComponent}
];
