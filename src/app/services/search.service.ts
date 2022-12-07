import { Injectable } from '@angular/core';

import { of, Subject } from 'rxjs';
import { GameResponse } from '../models/game-response.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
  searchSubject = new Subject<string>();

  setSearch(value: string): void {
    this.searchSubject.next(value);
  }

  filterGamesBySearch(games: GameResponse, searchTerm: string) {
    const filteredGames = [];
    for (const [key, value] of Object.entries(games)) {
      if (value.title.includes(searchTerm)) {
        filteredGames.push(value);
      }
    }

    return of(filteredGames);
  }
}
