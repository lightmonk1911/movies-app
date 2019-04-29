import { Component, OnInit } from '@angular/core';
import { Store, createSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IMovie, View } from '../short-movie/short-movie.component';
import { IListOfMovies, ISearchResult } from '../api/api.actions';
import { PageEvent, MatSnackBar, MatButtonToggleChange } from '@angular/material';
import { ActionTypes } from '../search-bar/search-bar.actions';
import {
  IButtonType,
  addToFavoriteBtn,
  inWatched,
  addToWatchedBtn,
  inFavorite
} from '../button/button.types';
import { Button } from '../button/button.model';
import { selectFavoriteMovies, selectWatchedMovies, selectSearchResult } from '../reducers';

const searchProjector = (
  favoriteList: Array<IMovie>,
  searchResult: ISearchResult,
  watchedList: Array<IMovie>
) => {
  if (searchResult.error) {
    return [];
  }
  return searchResult.movies.map((movie) => {
    const watched = watchedList.find(
      (watchedMovie: IMovie) => watchedMovie.imdbID === movie.imdbID
    );
    const favorite = favoriteList.find(
      (favoriteMovie: IMovie) => favoriteMovie.imdbID === movie.imdbID
    );
    const watchedBtn = new Button(watched ? inWatched : addToWatchedBtn, () =>
      this.store.dispatch({
        type: watched ? inWatched.actionType : addToWatchedBtn.actionType,
        payload: { movie }
      })
    );
    const favoriteBtn = new Button(favorite ? inFavorite : addToFavoriteBtn, () =>
      this.store.dispatch({
        type: favorite ? inFavorite.actionType : addToFavoriteBtn.actionType,
        payload: { movie }
      })
    );
    return {
      movie,
      buttons: [favoriteBtn, watchedBtn]
    };
  });
};

const combinedSelector = createSelector(
  selectFavoriteMovies,
  selectSearchResult,
  selectWatchedMovies,
  searchProjector
);

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  searchResult$: Observable<ISearchResult>;
  buttonTypes: Array<IButtonType> = [addToFavoriteBtn];
  buttons: Array<Button>;
  length = 10;
  pageSize = 10;
  moviesToShowPrepared$: Observable<Array<{ movie: IMovie; buttons: Array<Button> }>>;
  countOfMovies$: Observable<number>;
  query: string;
  view: View;

  constructor(
    private store: Store<{
      searchResult: ISearchResult;
      watched: IListOfMovies;
      favorite: IListOfMovies;
    }>,
    private snackBar: MatSnackBar
  ) {}

  changePage(pageEvent: PageEvent) {
    this.store.dispatch({
      type: ActionTypes.Search,
      payload: {
        query: this.query,
        page: pageEvent.pageIndex + 1
      }
    });
  }

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }

  trackByFunction(index) {
    return index;
  }

  changeView(changeEvent: MatButtonToggleChange) {
    this.view = changeEvent.value;
  }

  ngOnInit() {
    this.moviesToShowPrepared$ = this.store.select(combinedSelector);
    this.countOfMovies$ = this.store.select(({ searchResult: { totalMovies } }) => totalMovies);
    this.searchResult$ = this.store.select('searchResult');
    this.store
      .select(({ searchResult: { query } }) => query)
      .subscribe((query) => (this.query = query));
    this.searchResult$.subscribe(({ error, query }) => {
      if (error) {
        this.showMessage(`Возникла ошибка при поиске '${query}': ${error}`, 'закрыть');
      }
    });
  }
}
