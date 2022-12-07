import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
  mergeMap,
} from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Category } from 'src/app/models/category.model';
import { GameResponse } from 'src/app/models/game-response.model';
import { UtilService } from 'src/app/services/util.service';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories!: Category[];
  games!: GameResponse;
  categoryGames: Game[] = [];
  filteredGames: Game[] = [];
  slug!: string;
  searchActive: boolean = false;

  constructor(
    private dataService: DataService,
    private utilService: UtilService,
    route: ActivatedRoute,
    router: Router,
    private searchService: SearchService
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.slug = route.snapshot.paramMap.get('id') || '';
        this.getData();
      });

    this.slug = route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.searchService.searchSubject
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

  getData() {
    forkJoin([
      this.dataService.getCategories(),
      this.dataService.getGames(),
    ]).subscribe((res: any) => {
      this.categories = res[0];
      this.games = res[1];
      this.categoryGames = this.utilService.getGamesByCategory(
        this.categories,
        this.games,
        this.slug
      );
    });
  }
}
