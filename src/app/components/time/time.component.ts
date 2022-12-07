import { Component } from '@angular/core';
import { map, share, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})
export class TimeComponent {
  now = new Date();
  subscription!: Subscription;

  constructor() {
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe((time) => {
        let hour = this.now.getHours();
        let minuts = this.now.getMinutes();
        let NewTime = hour + ':' + minuts;
        this.now = time;
      });
  }
}
