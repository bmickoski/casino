import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data.service';
import { GameResponse } from './../../models/game-response.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  gameUrl!: string;
  slug!: string;
  games!: GameResponse;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    const navigation = router.getCurrentNavigation();
    const state = navigation?.extras?.state as any;
    this.gameUrl = state?.gameUrl;
  }

  ngOnInit(): void {
    if (!this.gameUrl) {
      this.slug = this.route.snapshot.paramMap.get('id') || '';
      this.dataService.getGames().subscribe((games: GameResponse) => {
        for (const [key, value] of Object.entries(games)) {
          if (value.slug === this.slug) {
            this.gameUrl = value['game-url'];
            break;
          }
        }
      });
    }
  }

  closeGame() {
    this.gameUrl = '';
    this.router.navigate(['']);
  }
}
