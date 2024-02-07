import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { PlanetsComponent } from './planets/planets.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PeopleComponent, PlanetsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'starwars';
}
