import { Component, OnInit } from '@angular/core';
import { PeopleService } from './people.service';
import { Character } from '../types/character';
import { NgFor, NgIf } from '@angular/common';
import { LoaderComponent } from '../shared/loader/loader.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [NgFor, LoaderComponent, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './people.component.html',
  styleUrl: './people.component.css',
})
export class PeopleComponent implements OnInit {
  peopleList: Character[] = [];
  isLoading: boolean = false;

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.peopleService.getPeople().subscribe({
      next: (people) => {
        this.peopleList = people.results.slice(0, 10);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
