import { IListOfMovies } from '../api/api.actions';

import {
  ActionsUnion as ShortMovieActionsUnion,
  ActionTypes as ShortMovieActionTypes
} from '../short-movie/short-movie.actions';
import {
  ActionTypes as FavoritePageActionTypes,
  ActionsUnion as FavoritePageActionsUnion
} from '../favorite-page/favorite-page.actions';

const initialFavorite = { page: 1, movies: [], totalMovies: 0 };

export function favoriteReducer(
  state: IListOfMovies = initialFavorite,
  action: ShortMovieActionsUnion | FavoritePageActionsUnion
): IListOfMovies {
  switch (action.type) {
    case ShortMovieActionTypes.RemoveFromFavorite: {
      const movies = state.movies.filter((movie) => action.payload.movie.imdbID !== movie.imdbID);
      const totalMovies = movies.length;
      const page = action.payload.page || state.page;
      return { ...state, movies, totalMovies, page };
    }

    case ShortMovieActionTypes.AddToFavorite: {
      const movies = state.movies
        .filter((movie) => action.payload.movie.imdbID !== movie.imdbID)
        .concat(action.payload.movie);
      const totalMovies = movies.length;
      return { ...state, movies, totalMovies };
    }

    case FavoritePageActionTypes.ChangeFavoriteListPage: {
      const { page } = action.payload;
      return { ...state, page };
    }

    default: {
      return state;
    }
  }
}
