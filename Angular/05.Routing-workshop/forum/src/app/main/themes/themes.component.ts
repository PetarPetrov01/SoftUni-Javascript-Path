import { Component } from '@angular/core';
import { PostsComponent } from './posts/posts.component';
import { RecentsComponent } from './recents/recents.component';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [PostsComponent, RecentsComponent],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.css',
})
export class ThemesComponent {}
