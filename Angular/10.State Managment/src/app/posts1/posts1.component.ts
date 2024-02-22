import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post, PostsState } from './posts1.type';

import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';

import * as PostAction from './posts1.action';

@Component({
  selector: 'app-posts1',
  standalone: true,
  imports: [FormsModule, NgIf, AsyncPipe],
  templateUrl: './posts1.component.html',
  styleUrl: './posts1.component.css',
})
export class Posts1Component {
  post$ = new Observable<Post>();
  textMsg: string = '';

  constructor(private store: Store<PostsState>) {
    console.log('sa');
    this.post$ = this.store.select('post');
    this.post$.subscribe((p) => console.log(p));
  }

  editText() {
    this.store.dispatch(new PostAction.UpdateText(this.textMsg));
  }

  reset() {
    this.store.dispatch(new PostAction.Reset());
  }
  
  upvote() {
    this.store.dispatch(new PostAction.Upvote());
  }

  downvote() {
    this.store.dispatch(new PostAction.Downvote());
  }
}
