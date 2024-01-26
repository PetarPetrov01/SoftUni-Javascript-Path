import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DogCardComponent } from '../dog-card/dog-card.component';

@Component({
  selector: 'app-dogs',
  standalone: true,
  imports: [NgFor,DogCardComponent],
  templateUrl: './dogs.component.html',
  styleUrl: './dogs.component.css'
})
export class DogsComponent {
  @Input('dogArr') dogs: { name: string, age: number, imgUrl: string }[] = [];
  
}
