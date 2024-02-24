import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, PostsState } from '../posts1/posts1.type';
import { Store } from '@ngrx/store';

import * as postActions2 from './posts2.actions';
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
  post$ = new Observable<Post>();
  textMsg: string = '';

  constructor(private store: Store<PostsState>) {
    this.post$ = this.store.select('post2');
    this.post$.subscribe((p) => console.log(p));
  }

  editText() {
    this.store.dispatch(postActions2.CHANGE_TEXT2({payload: this.textMsg}))
  }

  reset() {
    this.store.dispatch(postActions2.RESET2());
  }

  upvote() {
    this.store.dispatch(postActions2.UPVOTE2());
  }

  downvote() {
    this.store.dispatch(postActions2.DOWNVOTE2());
  }
}
