import { Component, OnInit, Input } from '@angular/core';
import { Button } from '../button/button.model';

@Component({
  selector: 'app-short-movie',
  templateUrl: './short-movie.component.html',
  styleUrls: ['./short-movie.component.scss']
})
export class ShortMovieComponent implements OnInit {
  @Input() movie: IMovie;
  @Input() buttons: Array<Button>;
  @Input() view: View;

  constructor() {

  }

  ngOnInit() {}

  trackByFunction(index) {
    return index;
  }
}

export interface IMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export type View = 'list' | 'cards';
