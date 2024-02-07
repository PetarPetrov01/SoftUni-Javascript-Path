import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';
import { Character } from '../../types/character';
import { ActivatedRoute } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [LoaderComponent, NgIf],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
})
export class CharacterComponent implements OnInit {
  isLoading: boolean = false;
  selectedId: string = '';
  character!: Character;

  constructor(
    private peopleService: PeopleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.selectedId = params['id'];
    });

    this.peopleService.getCharacter(this.selectedId).subscribe({
      next: (ch) => {
        this.character = ch;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
