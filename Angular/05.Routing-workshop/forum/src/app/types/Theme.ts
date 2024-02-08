import { Post } from './Post';
import { UserId } from './user-id';

export interface Theme {
  subscribers: string[];
  posts: string[];
  _id: string;
  themeName: string;
  userId: UserId;
  created_at: string;
}

export interface ThemePopulated extends Omit<Theme, 'posts'>{
  posts: Post[]
}