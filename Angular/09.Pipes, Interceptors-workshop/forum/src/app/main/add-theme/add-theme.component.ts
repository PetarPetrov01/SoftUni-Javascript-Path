import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-add-theme',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './add-theme.component.html',
  styleUrl: './add-theme.component.css',
})
export class AddThemeComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  createThemeHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.apiService
      .createTheme(form.value.themeName, form.value.postText)
      .subscribe();

    // this.router.navigate(['/themes']);
  }
}
