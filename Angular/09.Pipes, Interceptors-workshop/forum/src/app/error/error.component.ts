import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ErrorService } from './error.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [NgIf],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent implements OnInit {
  error$ = this.errorService.error$;
  errorMsg: string = '';

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.error$.subscribe((err: any) => {
      this.errorMsg = err?.error.message || err?.message;
    });
  }
}
