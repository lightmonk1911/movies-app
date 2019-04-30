import { IListOfMovies } from '../api/api.actions';

import {
  ActionsUnion as ShortMovieActionsUnion,
  ActionTypes as ShortMovieActionTypes
} from '../short-movie/short-movie.actions';
import {
  ActionTypes as WatchedPageActionTypes,
  ActionsUnion as WatchedPageActionsUnion
} from '../watched-page/watched-page.actions';
import { createMovieListReducer } from './movieListReducer';

export const watchedReducer: (
  state: IListOfMovies,
  action: ShortMovieActionsUnion | WatchedPageActionsUnion
) => IListOfMovies = createMovieListReducer(
  ShortMovieActionTypes.RemoveFromWatched,
  ShortMovieActionTypes.AddToWatched,
  WatchedPageActionTypes.ChangeWatchedListPage
);
