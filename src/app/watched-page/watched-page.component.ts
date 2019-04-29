import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IListOfMovies } from '../api/api.actions';
import { map } from 'rxjs/operators';
import { IMovie, View } from '../short-movie/short-movie.component';
import { PageEvent, MatButtonToggleChange } from '@angular/material';
import { ActionTypes } from './watched-page.actions';
import { Button } from '../button/button.model';
import { removeFromWatchedBtnType } from '../button/button.types';

@Component({
  selector: 'app-watched-page',
  templateUrl: './watched-page.component.html',
  styleUrls: ['./watched-page.component.scss']
})
export class WatchedPageComponent implements OnInit {
  watched$: Observable<IListOfMovies>;
  moviesToShowPrepared$: Observable<Array<{ movie: IMovie; buttons: Array<Button> }>>;
  length$: Observable<number>;
  pageSize = 10;
  view: View = 'cards';

  constructor(private store: Store<{ watched: IListOfMovies }>) {
    this.watched$ = this.store.select(({ watched }) => watched);
  }

  changePage(pageEvent: PageEvent) {
    this.store.dispatch({
      type: ActionTypes.ChangeWatchedListPage,
      payload: { page: pageEvent.pageIndex + 1 }
    });
  }

  changeView(changeEvent: MatButtonToggleChange) {
    this.view = changeEvent.value;
  }

  trackByFunction(index) {
    return index;
  }

  ngOnInit() {
    this.moviesToShowPrepared$ = this.store.select('watched').pipe(
      map(({ movies, page }) => {
        const moviesOnPage = movies.slice((page - 1) * this.pageSize, page * this.pageSize);
        return moviesOnPage.map((movie) => ({
          buttons: [
            new Button(removeFromWatchedBtnType, () =>
              this.store.dispatch({
                type: removeFromWatchedBtnType.actionType,
                payload: { movie, page: moviesOnPage.length < 2 ? page - 1 : page }
              })
            )
          ],
          movie
        }));
      })
    );
    this.length$ = this.watched$.pipe(map(({ totalMovies }) => totalMovies));
  }
}
