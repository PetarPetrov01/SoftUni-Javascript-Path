import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {


  constructor(private activated: ActivatedRoute){}

  ngOnInit(): void {
    this.activated.params.subscribe((params)=>{
      console.log(params['id']);
    })
  }
}
