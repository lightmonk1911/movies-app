import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IListOfMovies } from '../api/api.actions';
import { map } from 'rxjs/operators';
import { IMovie, View } from '../short-movie/short-movie.component';
import { PageEvent, MatButtonToggleChange } from '@angular/material';
import { Button } from '../button/button.model';
import { IButtonType } from '../button/button.types';

@Component({
  selector: 'app-list-of-movies',
  templateUrl: './list-of-movies.component.html',
  styleUrls: ['./list-of-movies.component.scss']
})
export class ListOfMoviesComponent implements OnInit {
  @Input() pageTitle: string;
  @Input() list$: Observable<IListOfMovies>;
  @Input() changePageActionType: string;
  @Input() dispatch: (action: { type: string; payload: { movie?: IMovie; page: number } }) => void;
  @Input() removeFromListBtnType: IButtonType;
  moviesToShowPrepared$: Observable<Array<{ movie: IMovie; buttons: Array<Button> }>>;
  length$: Observable<number>;
  pageSize = 10;
  view: View = 'cards';

  constructor() {}

  changePage(pageEvent: PageEvent) {
    this.dispatch({
      type: this.changePageActionType,
      payload: { page: pageEvent.pageIndex + 1 }
    });
  }

  changeView(changeEvent: MatButtonToggleChange) {
    this.view = changeEvent.value;
  }

  trackByFunction(index) {
    return index;
  }

  ngOnInit() {
    this.moviesToShowPrepared$ = this.list$.pipe(
      map(({ movies, page }) => {
        const moviesOnPage = movies.slice((page - 1) * this.pageSize, page * this.pageSize);
        return moviesOnPage.map((movie) => ({
          buttons: [
            new Button(this.removeFromListBtnType, () =>
              this.dispatch({
                type: this.removeFromListBtnType.actionType,
                payload: { movie, page: moviesOnPage.length < 2 ? page - 1 : page }
              })
            )
          ],
          movie
        }));
      })
    );
    this.length$ = this.list$.pipe(map(({ totalMovies }) => totalMovies));
  }
}
