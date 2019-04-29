import { ActionTypes, ActionsUnion, ISearchResult } from './api.actions';
import {
  ActionTypes as searchBarActionTypes,
  ActionsUnion as SearchBarActionsUnion
} from '../search-bar/search-bar.actions';

const initialState = {
  query: '',
  page: 1,
  movies: [],
  totalMovies: 0,
  error: null,
  searching: false
};

export function apiReducer(
  state: ISearchResult = initialState,
  action: ActionsUnion | SearchBarActionsUnion
) {
  switch (action.type) {
    case ActionTypes.NewSearchResult: {
      return { ...state, ...action.payload, searching: false };
    }

    case searchBarActionTypes.Search: {
      return { ...state, searching: true, error: null };
    }

    default: {
      return state;
    }
  }
}
