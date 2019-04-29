import { Action } from '@ngrx/store';

export enum ActionTypes {
  ChangeFavoriteListPage = '[favorite-page] change page'
}

export class ChangeFavoriteListPage implements Action {
  readonly type = ActionTypes.ChangeFavoriteListPage;
  constructor(public payload: { page: number }) {}
}

export type ActionsUnion = ChangeFavoriteListPage;
