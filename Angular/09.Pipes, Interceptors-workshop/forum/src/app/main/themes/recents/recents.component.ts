import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Post } from '../../../types/Post';
import { NgFor } from '@angular/common';
import { ElapsedTimePipe } from '../../../pipes/elapsed-time.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recents',
  standalone: true,
  imports: [NgFor, ElapsedTimePipe, RouterLink],
  templateUrl: './recents.component.html',
  styleUrl: './recents.component.css',
})
export class RecentsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getLatest().subscribe({
      next: (latest) => {
        this.posts = latest;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
