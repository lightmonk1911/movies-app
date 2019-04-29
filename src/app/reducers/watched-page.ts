import { IListOfMovies } from '../api/api.actions';

import {
  ActionsUnion as ShortMovieActionsUnion,
  ActionTypes as ShortMovieActionTypes
} from '../short-movie/short-movie.actions';
import {
  ActionTypes as WatchedPageActionTypes,
  ActionsUnion as WatchedPageActionsUnion
} from '../watched-page/watched-page.actions';

const initialWatched = { page: 1, movies: [], totalMovies: 0 };

export function watchedReducer(
  state: IListOfMovies = initialWatched,
  action: ShortMovieActionsUnion | WatchedPageActionsUnion
): IListOfMovies {
  switch (action.type) {
    case ShortMovieActionTypes.RemoveFromWatched: {
      const movies = state.movies.filter((movie) => action.payload.movie.imdbID !== movie.imdbID);
      const totalMovies = movies.length;
      const page = action.payload.page || state.page;
      return { ...state, movies, totalMovies, page };
    }

    case ShortMovieActionTypes.AddToWatched: {
      const movies = state.movies
        .filter((movie) => action.payload.movie.imdbID !== movie.imdbID)
        .concat(action.payload.movie);
      const totalMovies = movies.length;
      return { ...state, movies, totalMovies };
    }

    case WatchedPageActionTypes.ChangeWatchedListPage: {
      const { page } = action.payload;
      return { ...state, page };
    }

    default: {
      return state;
    }
  }
}
