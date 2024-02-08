import { Component } from '@angular/core';
import { PostsComponent } from './posts/posts.component';
import { RecentsComponent } from './recents/recents.component';
import { HomeComponent } from '../home/home.component';
import { UserService } from '../../user/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [PostsComponent, RecentsComponent, HomeComponent, NgIf],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.css',
})
export class ThemesComponent {
  constructor(private userService: UserService) {}

  get isLogged() {
    return this.userService.isLogged;
  }
}
