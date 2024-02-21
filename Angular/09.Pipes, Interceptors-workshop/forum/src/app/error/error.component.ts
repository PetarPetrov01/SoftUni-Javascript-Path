import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent implements OnInit {
  error$ = this.errorService.apiError$$.asObservable();
  errorMsg: string = '';

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.error$.subscribe((err: any) => {
      this.errorMsg = err.message;
    });
  }
}
