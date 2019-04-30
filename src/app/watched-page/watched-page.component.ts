import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IListOfMovies } from '../api/api.actions';
import { IMovie } from '../short-movie/short-movie.component';
import { ActionTypes } from './watched-page.actions';
import { removeFromWatchedBtnType } from '../button/button.types';

@Component({
  selector: 'app-watched-page',
  templateUrl: './watched-page.component.html',
  styleUrls: ['./watched-page.component.scss']
})
export class WatchedPageComponent implements OnInit {
  pageTitle = 'Просмотренное';
  list$: Observable<IListOfMovies>;
  changePageActionType = ActionTypes.ChangeWatchedListPage;

  removeFromListBtnType = removeFromWatchedBtnType;
  constructor(private store: Store<{ watched: IListOfMovies }>) {
    this.list$ = this.store.select(({ watched }) => watched);
  }

  dispatch = (action: { type: string; payload: { movie?: IMovie; page: number } }) =>
    this.store.dispatch(action)

  ngOnInit() {}
}
