import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActionTypes } from './movie-page.actions';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Button } from '../button/button.model';
import {
  backBtn,
  inFavorite,
  addToFavoriteBtn,
  inWatched,
  addToWatchedBtn
} from '../button/button.types';
import { MatSnackBar } from '@angular/material';
import { IListOfMovies } from '../api/api.actions';
import { IMovie } from '../short-movie/short-movie.component';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit {
  backBtn: Button;
  favoriteBtn: Button;
  watchedBtn: Button;
  movieData: IMovieData;
  movieProps: Array<IMovieProp>;
  badImgPath = false;
  propsToShow = [
    { key: 'Year', label: 'Год' },
    { key: 'Released', label: 'Дата релиза' },
    { key: 'Runtime', label: 'Длительность' },
    { key: 'Genre', label: 'Жанр' },
    { key: 'Director', label: 'Режиссер' },
    { key: 'Writer', label: 'Автор' },
    { key: 'Actors', label: 'Актерский состав' },
    { key: 'Plot', label: 'Сюжет' }
  ];


  constructor(
    private store: Store<{
      movieData: IMovieData;
      favorite: IListOfMovies;
      watched: IListOfMovies;
    }>,
    private route: ActivatedRoute,
    private location: Location,
    private snackBar: MatSnackBar
  ) {
    this.backBtn = new Button(backBtn, () => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }

  imgLoadError() {
    this.badImgPath = true;
  }

  ngOnInit() {
    this.store.select('movieData').subscribe((movieData) => {
      this.movieData = movieData;
      this.movieProps = this.propsToShow.map(({ key, label }) => {
        return { label, value: this.movieData[key] };
      });
      if (movieData.error) {
        this.showMessage(`Возникла ошибка при загрузке фильма: ${movieData.error}`, 'закрыть');
      }
    });
    this.store
      .select(({ favorite: { movies }, movieData: { imdbID } }) => ({ movies, imdbID }))
      .subscribe(({ movies, imdbID }) => {
        if (!imdbID) {
          return;
        }
        const favorite = movies.find((movie: IMovie) => movie.imdbID === imdbID);
        this.favoriteBtn = new Button(favorite ? inFavorite : addToFavoriteBtn, () =>
          this.store.dispatch({
            type: favorite ? inFavorite.actionType : addToFavoriteBtn.actionType,
            payload: { movie: this.movieData }
          })
        );
      });

    this.store
      .select(({ watched: { movies }, movieData: { imdbID } }) => ({ movies, imdbID }))
      .subscribe(({ movies, imdbID }) => {
        if (!imdbID) {
          return;
        }
        const watched = movies.find((movie: IMovie) => movie.imdbID === imdbID);
        this.watchedBtn = new Button(watched ? inWatched : addToWatchedBtn, () =>
          this.store.dispatch({
            type: watched ? inWatched.actionType : addToWatchedBtn.actionType,
            payload: { movie: this.movieData }
          })
        );
      });
    this.store.dispatch({
      type: ActionTypes.NeedMovieData,
      payload: { imdbID: this.route.snapshot.paramMap.get('id') }
    });
  }
}

export default interface IMovieData {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: [
    {
      Source: string;
      Value: string;
    }
  ];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  error?: string;
  loading?: boolean;
}

export interface IMovieProp {
  label: string;
  value: string;
}
