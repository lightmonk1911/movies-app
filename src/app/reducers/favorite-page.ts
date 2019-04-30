import { IListOfMovies } from '../api/api.actions';

import {
  ActionsUnion as ShortMovieActionsUnion,
  ActionTypes as ShortMovieActionTypes
} from '../short-movie/short-movie.actions';
import {
  ActionTypes as FavoritePageActionTypes,
  ActionsUnion as FavoritePageActionsUnion
} from '../favorite-page/favorite-page.actions';
import { createMovieListReducer } from './movieListReducer';

export const favoriteReducer: (
  state: IListOfMovies,
  action: ShortMovieActionsUnion | FavoritePageActionsUnion
) => IListOfMovies = createMovieListReducer(
  ShortMovieActionTypes.RemoveFromFavorite,
  ShortMovieActionTypes.AddToFavorite,
  FavoritePageActionTypes.ChangeFavoriteListPage
);
