export interface Post {
  text?: string;
  likes?: number;
}

export interface PostsState {
  post1: Post;
  post2: Post;
}
