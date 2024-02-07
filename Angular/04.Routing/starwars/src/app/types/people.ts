import { Character } from './character';

export interface People {
  count: number;
  next: string;
  previous: string | null;
  results: Character[];
}
