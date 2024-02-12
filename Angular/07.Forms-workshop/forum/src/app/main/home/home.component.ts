import { Component } from '@angular/core';
import { UserService } from '../../user/user.service';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private userService: UserService) {}

  get isLogged(){
    return this.userService.isLogged;
  }
}
