import { ActionTypes, ActionsUnion } from '../api/api.actions';
import {
  ActionTypes as MoviePageActionTypes,
  ActionsUnion as MoviePageActionsUnion
} from '../movie-page/movie-page.actions';

const initialState = { loading: false };

export function movieDataReducer(
  state = initialState,
  action: ActionsUnion | MoviePageActionsUnion
) {
  switch (action.type) {
    case ActionTypes.GotMovieData: {
      return action.payload;
    }

    case MoviePageActionTypes.NeedMovieData: {
      return { loading: true, error: null };
    }

    default: {
      return state;
    }
  }
}
