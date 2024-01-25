import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dogs',
  standalone: true,
  imports: [NgFor],
  templateUrl: './dogs.component.html',
  styleUrl: './dogs.component.css'
})
export class DogsComponent {

  @Input('dogArr') dogs: { name: string, age: number, imgUrl: string }[] = [];

}
