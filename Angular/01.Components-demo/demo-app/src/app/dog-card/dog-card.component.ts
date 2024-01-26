import { Component, Input, OnInit } from '@angular/core';
import { Dog } from '../type/Dog';

@Component({
  selector: 'app-dog-card',
  standalone: true,
  imports: [DogCardComponent],
  templateUrl: './dog-card.component.html',
  styleUrl: './dog-card.component.css'
})
export class DogCardComponent implements OnInit{
  @Input('dog') dog: Dog | undefined = undefined;

  ngOnInit(): void {
    console.log(this.dog);
  }

  showInfo = true;

  handleClick(event: Event) {
    this.showInfo = !this.showInfo;
  }
}
