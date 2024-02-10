import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmailValidateDirective } from '../email-validate.directive';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, EmailValidateDirective, NgIf],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css',
})
export class ReactiveFormComponent {
  registerForm = this.fb.group({
    name: ['', [Validators.required,Validators.minLength(3)]],
    email: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  submitHandler() {
    console.log(this.registerForm.get('email')?.errors);
  }
}
