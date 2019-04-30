import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApiService } from './api/api.service';
import { ActionTypes as searchBarActionTypes } from './search-bar/search-bar.actions';
import { ActionTypes as apiActionTypes } from './api/api.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ActionTypes as MoviePageActionTypes } from './movie-page/movie-page.actions';
import { of } from 'rxjs';

@Injectable()
export class AppEffects {
  @Effect()
  searchResult$ = this.actions$.pipe(
    ofType(searchBarActionTypes.Search),
    mergeMap(({ payload: { query, page } }) =>
      this.api.search(query, page).pipe(
        map((res) => ({
          type: apiActionTypes.NewSearchResult,
          payload: {
            query,
            page,
            movies: res.Search || [],
            totalMovies: res.totalResults || 0,
            error: res.Error
          }
        })),
        catchError((error) =>
          of({
            type: apiActionTypes.NewSearchResult,
            payload: {
              query,
              page,
              movies: [],
              totalMovies: 0,
              error: error.message
            }
          })
        )
      )
    )
  );

  @Effect()
  movieData$ = this.actions$.pipe(
    ofType(MoviePageActionTypes.NeedMovieData),
    mergeMap(({ payload: { imdbID } }) =>
      this.api.getMovie(imdbID).pipe(
        map((res) => ({
          type: apiActionTypes.GotMovieData,
          payload: { ...res, error: res.Error }
        })),
        catchError((error) =>
          of({ type: apiActionTypes.GotMovieData, payload: { error: error.message } })
        )
      )
    )
  );

  constructor(private actions$: Actions, private api: ApiService) {}
}
