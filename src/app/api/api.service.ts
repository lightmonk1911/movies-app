import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://omdbapi.com/';
  apikey = '3111e7d8';

  constructor(private http: HttpClient) {}

  search(query: string, page: number = 1): Observable<any> {
    return this.http.get(`${this.url}?apikey=${this.apikey}&s=${query}&page=${page}`);
  }

  getMovie(imdbID: string): Observable<any> {
    return this.http.get(`${this.url}?apikey=${this.apikey}&i=${imdbID}`);
  }
}
