import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EMAIL_DOMAINS } from '../../validators/email-validator';
import { UserService } from '../user.service';

interface User {
  username: string;
  email: string;
  tel: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user: User = this.userService.user!;
  editData!: User;
  telCode: string = '+359';
  emailPattern = new RegExp(`[^@]{6,}@gmail\.(${EMAIL_DOMAINS.join('|')})$`);

  isEditing: boolean = false;

  constructor(private userService: UserService) {}

  toggleEditing() {
    this.isEditing = !this.isEditing;
    this.editData = { ...this.user, tel: this.user.tel.slice(4) };
  }

  submitEditHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value)
    this.userService
      .updateProfile(
        form.value.username,
        form.value.email,
        `${String(form.value.tel).includes('+')?'':form.value.telStart}${form.value.tel}`
      )
      .subscribe((user) => {
        this.user = user;
      });
    this.toggleEditing();
  }
}
