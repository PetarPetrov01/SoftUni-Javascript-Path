import { createReducer, on } from '@ngrx/store';
import { Post } from '../posts1/posts1.type';

import * as postActions2 from './posts2.actions';

export const initialValues: Post = {
  text: 'Welcome',
  likes: 0,
};

export const postReducer2 = createReducer(
  initialValues,
  on(postActions2.CHANGE_TEXT2, (state, action) => ({
    ...state,
    text: action.payload,
  })),
  on(postActions2.RESET2, () => initialValues),
  on(postActions2.UPVOTE2, (state) => ({
    ...state,
    likes: state.likes !== undefined ? state.likes + 1 : 0,
  })),
  on(postActions2.DOWNVOTE2, (state) => ({
    ...state,
    likes: state.likes !== undefined ? state.likes - 1 : 0,
  }))
);
