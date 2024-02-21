import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-theme',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './add-theme.component.html',
  styleUrl: './add-theme.component.css',
})
export class AddThemeComponent {
  createThemeHandler(form: NgForm) {    
    if (form.invalid){
      return
    }
    
  }
}
