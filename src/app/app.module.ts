import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { OverviewComponent } from './components/overview/overview.component';
import { GameComponent } from './components/game/game.component';
import { SafePipe } from './pipes/safe.pipe';
import { TimeComponent } from './components/time/time.component';
import { CategoryComponent } from './components/category/category.component';
import { GridComponent } from './components/grid/grid.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    OverviewComponent,
    GameComponent,
    SafePipe,
    TimeComponent,
    CategoryComponent,
    GridComponent,
    SearchComponent,
  ],
  imports: [BrowserModule, NgbModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
