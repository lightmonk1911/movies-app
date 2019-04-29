import { Action } from '@ngrx/store';
import { IMovie } from '../short-movie/short-movie.component';

export enum ActionTypes {
  NewSearchResult = '[api] NewSearchResult',
  GotMovieData = '[api] GotMovieData',
  StartedSearching = '[api] StartedSearching'
}

export class NewSearchResult implements Action {
  readonly type = ActionTypes.NewSearchResult;

  constructor(public payload: ISearchResult) {}
}

export class StartedSearching implements Action {
  readonly type = ActionTypes.StartedSearching;
}

export class GotMovieData implements Action {
  readonly type = ActionTypes.GotMovieData;

  constructor(public payload: any) {}
}

export type ActionsUnion = NewSearchResult | GotMovieData | StartedSearching;

export interface IListOfMovies {
  page: number;
  movies: Array<IMovie>;
  totalMovies: number;
}

export interface ISearchResult extends IListOfMovies {
  query: string;
  error: string | undefined;
  searching: boolean;
}

