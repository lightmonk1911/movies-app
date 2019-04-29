import { Component, OnInit, Input } from '@angular/core';
import { IMovieProp } from '../movie-page/movie-page.component';

@Component({
  selector: 'app-movie-prop',
  templateUrl: './movie-prop.component.html',
  styleUrls: ['./movie-prop.component.scss']
})
export class MoviePropComponent implements OnInit {
  @Input() prop: IMovieProp;

  constructor() { }

  ngOnInit() {
  }

}
