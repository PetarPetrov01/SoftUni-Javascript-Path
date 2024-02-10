import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CreateFormComponent } from './create-form/create-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreateFormComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'demo';
}
