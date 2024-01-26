import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { DogsComponent } from './dogs/dogs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, DogsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo-app';

  dogs = [
    { name: 'Michael', age: 3, imgUrl: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg' },
    { name: 'Jorj', age: 2, imgUrl: 'https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg' },
    { name: 'Safri', age: 1, imgUrl: 'https://www.thesprucepets.com/thmb/HAXua0m1oC4ahFBDLc8k0j9y0YQ=/3300x0/filters:no_upscale():strip_icc()/fluffiest-dogs-ever-4589343-hero-939e88f02bae4cfdb557bb7c15ee5384.jpg' },
    { name: 'Penny', age: 2.3, imgUrl: 'https://images.ctfassets.net/2djrn56blv6r/7LjKuMBICdepQN605IbOHb/a76593463f0f4f2624560944d31faf5c/shutterstock_452360023_header.jpg?fm=webp&q=75&w=1920' },
  ];
}
