export interface Post {
  text?: string;
  likes?: number;
}

export interface PostsState {
  post: Post;
}
