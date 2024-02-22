import * as PostActions from './posts1.action';
import { Post } from './posts1.type';

const defPost: Post = {
  likes: 0,
  text: 'Welcome',
};

function changeState(state: Post, data: Post) {
  return { ...state, ...data };
}

export function posts1Reducer(state: Post, action: PostActions.UpdateText) {
  switch (action.type) {
    case PostActions.UPDATE_TEXT:
        return {...state, text: action.payload}
    //   return changeState(state, { text: action.payload });
    case PostActions.RESET:
      return defPost;
    case PostActions.UPVOTE:
      return changeState(state, {
        likes: state?.likes != undefined ? state.likes + 1 : 0,
      });
    case PostActions.DOWNVOTE:
      return changeState(state, {
        likes: state?.likes != undefined ? state.likes - 1 : 0,
      });
    default:
      return state;
  }
}
