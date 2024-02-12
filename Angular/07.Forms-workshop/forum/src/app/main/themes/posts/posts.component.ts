import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Theme } from '../../../types/Theme';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  themes: Theme[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getThemes().subscribe({
      next: (themes: Theme[]) => {
        this.themes = themes;
        console.log(themes);
      },
      error: (err: Error) => {
        console.error(err);
      },
    });
  }
}
