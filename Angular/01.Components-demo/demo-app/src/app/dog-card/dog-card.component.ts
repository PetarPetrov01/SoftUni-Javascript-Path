import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dog-card',
  standalone: true,
  imports: [DogCardComponent],
  templateUrl: './dog-card.component.html',
  styleUrl: './dog-card.component.css'
})
export class DogCardComponent implements OnInit{

}
