import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Theme } from '../../../types/Theme';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';
import { SlicePipe } from '../../../pipes/slice.pipe';
import { ElapsedTimePipe } from '../../../pipes/elapsed-time.pipe';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive, SlicePipe],
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
      },
      error: (err: Error) => {
        console.error(err);
      },
    });
  }
}
