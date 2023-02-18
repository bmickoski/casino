import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
  mergeMap,
  Subscription,
} from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { SearchService } from 'src/app/services/search.service';
import { Category } from 'src/app/models/category.model';
import { GameResponse } from 'src/app/models/game-response.model';
import { UtilService } from 'src/app/services/util.service';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories!: Category[];
  games!: GameResponse;
  categoryGames: Game[] = [];
  filteredGames: Game[] = [];
  slug!: string;
  searchActive: boolean = false;
  searchSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(
    route: ActivatedRoute,
    router: Router,
    private dataService: DataService,
    private utilService: UtilService,
    private searchService: SearchService
  ) {
    this.routeSubscription = router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.slug = route.snapshot.paramMap.get('id') || '';
        this.getData();
      });

    this.slug = route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.searchSubscription = this.searchService.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        mergeMap((searchQuery: string) => {
          this.searchActive = searchQuery ? true : false;
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
    this.routeSubscription?.unsubscribe();
  }

  getData() {
    forkJoin([
      this.dataService.getCategories(),
      this.dataService.getGames(),
    ]).subscribe({
      next: ([categories, games]: [Category[], GameResponse]) => {
        this.categories = categories;
        this.games = games;
        this.categoryGames = this.utilService.getGamesByCategory(
          this.categories,
          this.games,
          this.slug
        );
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }
}
