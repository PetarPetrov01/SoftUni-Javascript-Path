import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dog-card',
  standalone: true,
  imports: [DogCardComponent],
  templateUrl: './dog-card.component.html',
  styleUrl: './dog-card.component.css'
})
export class DogCardComponent implements OnInit{
  @Input('dog') dog: { name: string, age: number, imgUrl: string } = {
    name:'',
    age: 0,
    imgUrl: ''
  };

  ngOnInit(): void {
    console.log(this.dog);
  }

  showInfo = true;

  handleClick(event: Event) {
    this.showInfo = !this.showInfo;
  }
}
