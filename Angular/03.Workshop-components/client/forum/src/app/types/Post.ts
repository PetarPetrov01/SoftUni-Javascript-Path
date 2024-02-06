import { Theme } from "./Theme";
import { UserId } from "./user-id";

export interface Post {
  likes: string[];
  _id: string;
  text: string;
  userId: UserId;
  themeId: Theme;
};
