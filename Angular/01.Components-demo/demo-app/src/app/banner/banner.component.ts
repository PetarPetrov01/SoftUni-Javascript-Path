import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [NgFor],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  dogs = [
    {name:'Michael',age: 3},
    {name:'Jorj',age: 2},
    {name:'Safri',age: 1},
    {name:'Penny',age: 2.3},
  ];
}
