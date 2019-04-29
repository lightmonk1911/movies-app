import { Action } from '@ngrx/store';

export enum ActionTypes {
  ChangeWatchedListPage = '[watched-page] change page'
}

export class ChangeWatchedListPage implements Action {
  readonly type = ActionTypes.ChangeWatchedListPage;
  constructor(public payload: { page: number }) {}
}

export type ActionsUnion = ChangeWatchedListPage;
