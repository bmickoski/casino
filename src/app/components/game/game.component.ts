import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  gameUrl!: string;
  slug!: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    const navigation = router.getCurrentNavigation();
    const state = navigation?.extras?.state as any;
    this.gameUrl = state?.gameUrl;
  }

  ngOnInit(): void {}

  closeGame() {
    this.gameUrl = '';
    this.router.navigate(['']);
  }
}
