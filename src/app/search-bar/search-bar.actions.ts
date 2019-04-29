import { Action } from '@ngrx/store';

export enum ActionTypes {
  Search = '[search-bar] Search'
}

export class Search implements Action {
  readonly type = ActionTypes.Search;

  constructor(public payload: { query: string, page: number }) {}
}

export type ActionsUnion = Search;
