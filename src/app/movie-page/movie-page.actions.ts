import { Action } from '@ngrx/store';

export enum ActionTypes {
  NeedMovieData = '[movie-page] Need movie data'
}

export class NeedMovieData implements Action {
  readonly type = ActionTypes.NeedMovieData;

  constructor(public payload: { imdbID: string }) {}
}

export type ActionsUnion = NeedMovieData;
