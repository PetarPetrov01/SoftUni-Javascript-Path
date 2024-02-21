import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { validateEmail } from '../../validators/email-validator';
import { UserService } from '../user.service';
import { matchPasswordsValidator } from '../../validators/match-passwords-validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, NgIf, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, validateEmail()]],
    phone: ['', [Validators.required]],
    passwordGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(5)]],
        rePassword: ['', [Validators.required, Validators.minLength(5)]],
      },
      {
        validators: [matchPasswordsValidator('password', 'rePassword')],
      }
    ),
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  submiteRegisterHandler() {
    if (this.registerForm.invalid) {
      return;
    }

    this.userService.login();
    this.router.navigate(['/']);
  }
}
