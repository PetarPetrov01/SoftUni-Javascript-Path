import { Component, OnInit } from '@angular/core';
import { PeopleService } from './people.service';
import { Character } from '../types/character';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [NgFor],
  templateUrl: './people.component.html',
  styleUrl: './people.component.css',
})
export class PeopleComponent implements OnInit{
peopleList: Character[] = [];

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.peopleService.getPeople().subscribe({
      next: (people)=>{
        this.peopleList = people.results.slice(0, 10);
        console.log(this.peopleList);
      },
      error: (err)=>console.log(err)
    })
  }
}
