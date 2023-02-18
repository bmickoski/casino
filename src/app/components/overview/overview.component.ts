import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  mergeMap,
  Subscription,
} from 'rxjs';
import { Router } from '@angular/router';

import { Category } from 'src/app/models/category.model';
import { GameResponse } from 'src/app/models/game-response.model';
import { DataService } from 'src/app/services/data.service';
import { SearchService } from 'src/app/services/search.service';
import { UtilService } from './../../services/util.service';
import { CategoryGame } from 'src/app/models/category-game.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  categories!: Category[];
  games!: GameResponse;
  gamesByCategory: CategoryGame = {};
  test!: any;
  searchText: string = '';
  searchActive: boolean = false;
  filteredGames!: any[];
  searchSubscription!: Subscription;

  constructor(
    private dataService: DataService,
    private utilService: UtilService,
    private searchService: SearchService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.searchSubscription = this.searchService.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        mergeMap((searchQuery) => {
          if (searchQuery) {
            this.searchActive = true;
          } else {
            this.searchActive = false;
          }
          return this.searchService.filterGamesBySearch(
            this.games,
            searchQuery
          );
        })
      )
      .subscribe((results) => {
        this.filteredGames = results;
      });

    this.getData();
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  getData() {
    forkJoin([
      this.dataService.getCategories(),
      this.dataService.getGames(),
    ]).subscribe((res: any) => {
      this.categories = res[0];
      this.games = res[1];
      this.gamesByCategory = this.utilService.filterGameByCategory(
        this.categories,
        this.games
      );
    });
  }

  navigateToGame(game: any) {
    this.router.navigate(['/game/' + game['slug']], {
      state: { gameUrl: game['game-url'] },
    });
  }

  navigateToCategory(categorySlug: string) {
    this.router.navigate(['/games/' + categorySlug]);
  }
}
