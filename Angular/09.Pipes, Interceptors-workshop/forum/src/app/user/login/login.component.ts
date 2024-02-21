import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { validateEmail } from '../../validators/email-validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, validateEmail()]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  login(): void {
    if (this.loginForm.invalid) {
      console.log(this.loginForm.get('email')?.errors);
      return;
    }

    this.userService.login();
    this.router.navigate(['/']);
  }
}
