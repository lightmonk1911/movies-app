import { IListOfMovies } from '../api/api.actions';
import { IMovie } from '../short-movie/short-movie.component';

const initial = { page: 1, movies: [], totalMovies: 0 };

export const createMovieListReducer = (
  removeActionType: string,
  addActionType: string,
  changePageActionType: string
) =>
  function reducer(
    state: IListOfMovies = initial,
    action: { type: string, payload: { movie?: IMovie, page?: number}}
  ): IListOfMovies {
    switch (action.type) {
      case removeActionType: {
        const movies = state.movies.filter((movie) => action.payload.movie.imdbID !== movie.imdbID);
        const totalMovies = movies.length;
        const page = action.payload.page || state.page;
        return { ...state, movies, totalMovies, page };
      }

      case addActionType: {
        const movies = state.movies
          .filter((movie) => action.payload.movie.imdbID !== movie.imdbID)
          .concat(action.payload.movie);
        const totalMovies = movies.length;
        return { ...state, movies, totalMovies };
      }

      case changePageActionType: {
        const { page } = action.payload;
        return { ...state, page };
      }

      default: {
        return state;
      }
    }
  };
