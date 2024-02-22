import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ErrorComponent } from './error/error.component';
import { ErrorService } from './error/error.service';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    AuthenticationComponent,
    ErrorComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  error$ = this.errorService.error$;

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.error$.subscribe((err) => {
      if (err) {
        setTimeout(() => {
          this.clearError()
        }, 4000);
      }
    });
  }

  clearError() {
    this.errorService.setError(null);
  }
  title = 'forum';
}
