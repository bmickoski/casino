import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from 'src/app/models/category.model';
import { SearchService } from 'src/app/services/search.service';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  categories$!: Observable<Category[]>;
  constructor(
    private dataService: DataService,
    private searchService: SearchService,
    private router: Router
  ) {}

  onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchService.setSearch(searchQuery?.trim());
  }

  ngOnInit(): void {
    this.categories$ = this.dataService.getCategories();
  }

  navigateToDefault(): void {
    this.router.navigateByUrl('');
  }

  navigateToCategory(category: Category): void {
    this.router.navigate(['/games/' + category.slug]);
  }
}
