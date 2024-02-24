import { createAction, props } from '@ngrx/store';

export const CHANGE_TEXT2 = createAction('[post] update2', props<{payload: string}>());
export const RESET2 = createAction('[post] reset2');
export const UPVOTE2 = createAction('[post] upvote2');
export const DOWNVOTE2 = createAction('[post] downvote2');


