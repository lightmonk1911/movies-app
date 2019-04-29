import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie, View } from '../short-movie/short-movie.component';
import { Store } from '@ngrx/store';
import { IListOfMovies } from '../api/api.actions';
import { map } from 'rxjs/operators';
import { PageEvent, MatButtonToggleChange } from '@angular/material';
import { ActionTypes } from './favorite-page.actions';
import { Button } from '../button/button.model';
import { removeFromFavoriteBtnType } from '../button/button.types';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit {
  favorite$: Observable<IListOfMovies>;
  buttonCreators: ((movie: IMovie) => Observable<{ label: string; onClick: () => void }>)[];
  moviesToShowPrepared$: Observable<Array<{ movie: IMovie; buttons: Array<Button> }>>;
  length$: Observable<number>;
  pageSize = 10;
  view: View = 'cards';

  constructor(private store: Store<{ favorite: IListOfMovies }>) {
    this.favorite$ = this.store.select(({ favorite }) => favorite);
  }

  changePage(pageEvent: PageEvent) {
    this.store.dispatch({
      type: ActionTypes.ChangeFavoriteListPage,
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
    this.moviesToShowPrepared$ = this.favorite$.pipe(
      map(({ movies, page }) => {
        const moviesOnPage = movies.slice((page - 1) * this.pageSize, page * this.pageSize);
        return moviesOnPage.map((movie) => ({
          buttons: [
            new Button(removeFromFavoriteBtnType, () =>
              this.store.dispatch({
                type: removeFromFavoriteBtnType.actionType,
                payload: { movie, page: moviesOnPage.length < 2 ? page - 1 : page }
              })
            )
          ],
          movie
        }));
      })
    );
    this.length$ = this.favorite$.pipe(map(({ totalMovies }) => totalMovies));
  }
}
