import { Action } from '@ngrx/store';
import { IMovie } from './short-movie.component';

export enum ActionTypes {
  RemoveFromWatched = '[short-movie] removeFromWatched',
  AddToWatched = '[short-movie] addToWatched',
  RemoveFromFavorite = '[short-movie] removeFromFavorite',
  AddToFavorite = '[short-movie] addToFavorite'
}

export class RemoveFromWatched implements Action {
  readonly type = ActionTypes.RemoveFromWatched;

  constructor(public payload: { movie: IMovie, page?: number }) {}
}

export class AddToWatched implements Action {
  readonly type = ActionTypes.AddToWatched;

  constructor(public payload: { movie: IMovie }) {}
}

export class RemoveFromFavorite implements Action {
  readonly type = ActionTypes.RemoveFromFavorite;

  constructor(public payload: { movie: IMovie, page?: number }) {}
}

export class AddToFavorite implements Action {
  readonly type = ActionTypes.AddToFavorite;

  constructor(public payload: { movie: IMovie }) {}
}


export type ActionsUnion = RemoveFromWatched | AddToWatched | RemoveFromFavorite | AddToFavorite;
