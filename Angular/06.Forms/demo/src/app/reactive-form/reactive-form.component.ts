import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css',
})
export class ReactiveFormComponent {
  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  submitHandler() {
    console.log(this.registerForm.valid);
  }
}
