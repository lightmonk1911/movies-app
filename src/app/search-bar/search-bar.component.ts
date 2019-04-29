import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActionTypes } from './search-bar.actions';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  value = 'test';
  @Input() searching: boolean;

  constructor(private store: Store<{ movies: any }>) {}

  search() {
    this.store.dispatch({ type: ActionTypes.Search, payload: { query: this.value, page: 1 } });
  }

  ngOnInit() {}
}
