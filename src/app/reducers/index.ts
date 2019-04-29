import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  INIT
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { apiReducer } from '../api/api.reducers';
import { loadState, saveState } from '../local-storage/local-storage';
import { movieDataReducer } from '../movie-page/movie-page.reducer';
import { IListOfMovies, ISearchResult } from '../api/api.actions';
import { watchedReducer } from './watched-page';
import { favoriteReducer } from './favorite-page';

export interface State {
  searchResult: ISearchResult;
  favorite: IListOfMovies;
  watched: IListOfMovies;
  movieData: any;
}

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export function syncWithLocalStorage(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (action.type === INIT) {
      return reducer({ ...state, ...loadState() }, action);
    }
    const nextState = reducer(state, action);
    saveState({
      favorite: nextState.favorite,
      watched: nextState.watched
    });
    return nextState;
  };
}

export const selectSearchResult = (state: State) => state.searchResult;
export const selectWatchedMovies = (state: State) => state.watched.movies;
export const selectFavoriteMovies = (state: State) => state.favorite.movies;

export const reducers: ActionReducerMap<State> = {
  searchResult: apiReducer,
  favorite: favoriteReducer,
  watched: watchedReducer,
  movieData: movieDataReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [syncWithLocalStorage, debug]
  : [syncWithLocalStorage];
