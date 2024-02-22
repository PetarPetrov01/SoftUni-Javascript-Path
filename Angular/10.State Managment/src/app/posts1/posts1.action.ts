import { Action } from '@ngrx/store';

export const UPDATE_TEXT = '[post] Edit';
export const RESET = '[post] Reset';
export const UPVOTE = '[post] Upvote';
export const DOWNVOTE = '[post] Downvote';

export class UpdateText implements Action {
  readonly type: string = UPDATE_TEXT;
  constructor(public payload: string) {}
}

export class Reset implements Action {
  readonly type: string = RESET;
}

export class Upvote implements Action {
  readonly type: string = UPVOTE;
}

export class Downvote implements Action {
  readonly type: string = DOWNVOTE;
}

export type All = UpdateText | Reset | Upvote | Downvote;
