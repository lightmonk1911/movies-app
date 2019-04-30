import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IListOfMovies } from '../api/api.actions';
import { IMovie } from '../short-movie/short-movie.component';
import { ActionTypes } from './favorite-page.actions';
import { removeFromFavoriteBtnType } from '../button/button.types';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit {
  pageTitle = 'Избранное';
  list$: Observable<IListOfMovies>;
  changePageActionType = ActionTypes.ChangeFavoriteListPage;

  removeFromListBtnType = removeFromFavoriteBtnType;
  constructor(private store: Store<{ favorite: IListOfMovies }>) {
    this.list$ = this.store.select(({ favorite }) => favorite);
  }

  dispatch = (action: { type: string; payload: { movie?: IMovie; page: number } }) =>
    this.store.dispatch(action)

  ngOnInit() {}
}
