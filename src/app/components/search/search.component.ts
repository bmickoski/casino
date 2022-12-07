import { Game } from 'src/app/models/game.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input()
  items: Game[] = [];
  constructor() {}

  ngOnInit(): void {}
}
