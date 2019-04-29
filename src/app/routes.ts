import { Route, Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';
import { WatchedPageComponent } from './watched-page/watched-page.component';
import { MainComponent } from './main/main.component';
import { MoviePageComponent } from './movie-page/movie-page.component';

export const navLinks: Array<INavigation> = [
  { label: 'Поиск', path: 'search', component: SearchPageComponent, iconName: 'search' },
  { label: 'Избранное', path: 'favorite', component: FavoritePageComponent, iconName: 'favoriteList' },
  { label: 'Просмотренное', path: 'watched', component: WatchedPageComponent, iconName: 'watchedList' }
];

const childrenRoutes = navLinks.map(({ path, component }) => ({ path, component }));

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search' },
  {
    path: '',
    component: MainComponent,
    children: childrenRoutes
  },
  { path: 'movie/:id', component: MoviePageComponent }
];

export interface INavigation extends Route {
  label: string;
  iconName: string;
}
