import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavComponent } from './nav/nav.component';
import { ShortMovieComponent } from './short-movie/short-movie.component';
import { ButtonComponent } from './button/button.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { WatchedPageComponent } from './watched-page/watched-page.component';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatPaginatorModule,
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatButtonToggleModule
} from '@angular/material';
import { MoviePropComponent } from './movie-prop/movie-prop.component';
import { ListOfMoviesComponent } from './list-of-movies/list-of-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavComponent,
    ShortMovieComponent,
    ButtonComponent,
    SearchBarComponent,
    SearchPageComponent,
    WatchedPageComponent,
    FavoritePageComponent,
    MoviePageComponent,
    MoviePropComponent,
    ListOfMoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppEffects]),
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
