import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IMovie, View } from '../short-movie/short-movie.component';
import { IListOfMovies, ISearchResult } from '../api/api.actions';
import { PageEvent, MatSnackBar, MatButtonToggleChange } from '@angular/material';
import { ActionTypes } from '../search-bar/search-bar.actions';
import {
  addToFavoriteBtnType,
  inWatchedBtnType,
  addToWatchedBtnType,
  inFavoriteBntType
} from '../button/button.types';
import { Button } from '../button/button.model';
import { map } from 'rxjs/operators';
import { listHasMovie, combinedSelector, prepareFoundMovies } from '../utils';





@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  searchResult$: Observable<ISearchResult>;
  length = 10;
  pageSize = 10;
  moviesToShowPrepared$: Observable<Array<{ movie: IMovie; buttons: Array<Button> }>>;
  view: View = 'cards';
  query: string;
  combinedLists$: Observable<{
    found: IMovie[];
    error: string;
    favorite: IMovie[];
    watched: IMovie[];
  }>;

  constructor(
    private store: Store<{
      searchResult: ISearchResult;
      watched: IListOfMovies;
      favorite: IListOfMovies;
    }>,
    private snackBar: MatSnackBar
  ) {

  }

  addToFavorite = (movie: IMovie) => {
    this.store.dispatch({
      type: addToFavoriteBtnType.actionType,
      payload: { movie }
    });
  }

  addToWatched = (movie: IMovie) => {
    this.store.dispatch({
      type: addToWatchedBtnType.actionType,
      payload: { movie }
    });
  }

  removeFromFavorite = (movie: IMovie) => {
    this.store.dispatch({
      type: inFavoriteBntType.actionType,
      payload: { movie }
    });
  }

  removeFromWatched = (movie: IMovie) => {
    this.store.dispatch({
      type: inWatchedBtnType.actionType,
      payload: { movie }
    });
  }

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
    this.combinedLists$ = this.store.select(combinedSelector);
    this.moviesToShowPrepared$ = this.combinedLists$.pipe(map(prepareFoundMovies.bind(this)));
    this.searchResult$ = this.store.select('searchResult');
    this.searchResult$.subscribe(({ error, query }) => {
      this.query = query;
      if (error) {
        this.showMessage(`Возникла ошибка при поиске '${query}': ${error}`, 'закрыть');
      }
    });
  }
}
