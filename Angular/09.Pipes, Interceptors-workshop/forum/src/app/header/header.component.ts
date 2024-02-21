import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../user/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private userService: UserService, private router: Router) {}

  get isLogged() {
    return this.userService.isLogged;
  }

  get username() {
    return this.userService.user?.username || '';
  }

  logout() {
    this.userService.logout().subscribe(()=>{
      this.router.navigate(['/']);
    })
  }
}
