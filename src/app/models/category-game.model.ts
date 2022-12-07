import { Game } from './game.model';

export interface CategoryGame {
  [key: string]: {
    games: Game[];
    slug: string;
  };
}
