import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { ThemePopulated } from '../../../types/Theme';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  themeId: string = '';
  theme!: ThemePopulated;

  constructor(
    private activated: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  get isLogged() {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    this.activated.params.subscribe((params) => {
      this.themeId = params['id'];
    });

    this.apiService.getComments(this.themeId).subscribe({
      next: (result) => {
        this.theme = result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
