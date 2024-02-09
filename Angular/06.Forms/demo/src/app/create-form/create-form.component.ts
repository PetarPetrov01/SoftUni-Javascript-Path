import { NgIf } from '@angular/common';
import { Component,  OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailValidateDirective } from '../email-validate.directive';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [FormsModule, NgIf, EmailValidateDirective],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css',
})
export class CreateFormComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm | undefined;

  ngOnInit(): void {}

  ngAfterViewInit() {
    console.log(this.loginForm?.form);
  }

  submitHandler() {
    console.log(this.loginForm?.valid);
    console.log(this.loginForm?.form);
  }
}
