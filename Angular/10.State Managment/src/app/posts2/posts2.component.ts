import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
@Component({
  selector: 'app-posts2',
  standalone: true,
  imports: [FormsModule, NgIf, AsyncPipe],
  templateUrl: './posts2.component.html',
  styleUrl: './posts2.component.css',
})
export class Posts2Component {
}
