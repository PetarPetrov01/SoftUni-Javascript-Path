import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EMAIL_DOMAINS } from '../../validators/email-validator';

interface User {
  username: string;
  email: string;
  telStart: string;
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
  user: User = {
    username: 'Depp',
    email: 'DeppSte@gmail.com',
    telStart: '+359',
    tel: '11121112',
  };
  emailPattern = new RegExp(`[^@]{6,}@gmail\.(${EMAIL_DOMAINS.join('|')})$`);

  isEditing: boolean = false;
  constructor() {}

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  submitEditHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.user = { ...form.value };
    this.toggleEditing();
  }
}
