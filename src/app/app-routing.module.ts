import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { GameComponent } from './components/game/game.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { OverviewComponent } from './components/overview/overview.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: NavigationComponent,
        children: [
          { path: '', redirectTo: 'games', pathMatch: 'full' },
          { path: 'games', component: OverviewComponent },
          { path: 'games/:id', component: CategoryComponent },
          // { path: 'game/:id', component: GameComponent },
        ],
      },
      { path: 'game/:id', component: GameComponent, pathMatch: 'full' },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
