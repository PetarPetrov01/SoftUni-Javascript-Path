import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';
import { Character } from '../../types/character';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
})
export class CharacterComponent implements OnInit {
  selectedId: string = '';
  character!: Character;

  constructor(
    private peopleService: PeopleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedId = params['id'];
    });

    this.peopleService.getCharacter(this.selectedId).subscribe({
      next: (ch) => {
        this.character = ch;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
