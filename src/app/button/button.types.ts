import { ActionTypes } from '../short-movie/short-movie.actions';
import { ThemePalette } from '@angular/material';

export const addToFavoriteBtn: IButtonType = {
  label: 'Добавить в избранное',
  actionType: ActionTypes.AddToFavorite,
  iconName: 'favorite',
  color: 'primary'
};

export const inFavorite: IButtonType = {
  label: 'В избранном',
  actionType: ActionTypes.RemoveFromFavorite,
  iconName: 'favorite',
  color: 'accent'
};

export const inWatched: IButtonType = {
  label: 'В просмотренном',
  actionType: ActionTypes.RemoveFromWatched,
  iconName: 'watched',
  color: 'accent'
};

export const removeFromWatchedBtnType: IButtonType = {
  label: 'Удалить из просмотренного',
  actionType: ActionTypes.RemoveFromWatched,
  iconName: 'remove',
  color: 'primary'
};

export const removeFromFavoriteBtnType: IButtonType = {
  label: 'Удалить из избранного',
  actionType: ActionTypes.RemoveFromFavorite,
  iconName: 'remove'
};

export const addToWatchedBtn: IButtonType = {
  label: 'Добавить в просмотренное',
  actionType: ActionTypes.AddToWatched,
  iconName: 'watched',
  color: 'primary'
};

export const backBtn: IButtonType = {
  label: 'Назад',
  iconName: 'back',
  color: 'primary'
};


export interface IButtonType {
  label: string;
  actionType?: string;
  iconName: string;
  color?: ThemePalette;
}
