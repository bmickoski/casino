import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input()
  gridItems!: any[];
  @Input()
  showAllRows: boolean = true;
  constructor(public router: Router) {}

  ngOnInit(): void {}

  navigateToGame(game: any) {
    this.router.navigate(['/game/' + game['slug']], {
      state: { gameUrl: game['game-url'] },
    });
  }
}
