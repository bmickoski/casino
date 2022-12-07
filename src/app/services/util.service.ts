import { Game } from './../models/game.model';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { GameResponse } from '../models/game-response.model';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  filterGameByCategory(categories: Category[], games: GameResponse) {
    const gamesByCategory: any = {};

    categories.forEach((category) => {
      for (const [key, value] of Object.entries(games)) {
        if (category['game-ids'].includes(+key)) {
          if (
            !gamesByCategory[category.name] ||
            !gamesByCategory[category.name].games
          ) {
            gamesByCategory[category.name] = {};
            gamesByCategory[category.name].games = [];
            gamesByCategory[category.name].slug = category.slug;
          } else {
            gamesByCategory[category.name].games.push(value);
          }
        }
      }
    });

    return gamesByCategory;
  }

  getGamesByCategory(
    categories: Category[],
    games: GameResponse,
    slug: string
  ) {
    const category = categories.find((category) => category.slug === slug);
    const categoryGames: Game[] = [];
    if (category) {
      for (const [key, value] of Object.entries(games)) {
        if (category['game-ids'].includes(+key)) {
          categoryGames.push(value);
        }
      }
    }

    return categoryGames;
  }
}
