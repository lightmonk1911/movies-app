import { IMovie } from '../short-movie/short-movie.component';
import {
  IButtonType,
  inWatchedBtnType,
  addToWatchedBtnType,
  inFavoriteBntType,
  addToFavoriteBtnType
} from '../button/button.types';
import { Button } from '../button/button.model';

export const listHasMovie = (list: Array<IMovie>, movie: IMovie) =>
  list.find((movieInList) => movieInList.imdbID === movie.imdbID);

export const combinedSelector = ({
  searchResult: { movies: found, error },
  favorite: { movies: favorite },
  watched: { movies: watched }
}) => ({
  found,
  error,
  favorite,
  watched
});

const getCreateBtnFunc = (movie: IMovie) => (
  list: Array<IMovie>,
  addToList: (movie: IMovie) => void,
  removeFromList: (movie: IMovie) => void,
  inListBtnType: IButtonType,
  addToListBtnType: IButtonType
) => {
  const inList = !!listHasMovie(list, movie);
  let btn: Button;
  if (inList) {
    btn = new Button(inListBtnType, () => removeFromList(movie));
  } else {
    btn = new Button(addToListBtnType, () => addToList(movie));
  }
  return btn;
};

export function prepareFoundMovies({ found, error, favorite, watched }) {
  if (error) {
    return [];
  }
  return found.map((movie: IMovie) => {
    const createBtn = getCreateBtnFunc(movie);
    const watchedBtn = createBtn(
      watched,
      this.addToWatched,
      this.removeFromWatched,
      inWatchedBtnType,
      addToWatchedBtnType
    );
    const favoriteBtn = createBtn(
      favorite,
      this.addToFavorite,
      this.removeFromFavorite,
      inFavoriteBntType,
      addToFavoriteBtnType
    );
    return {
      movie,
      buttons: [favoriteBtn, watchedBtn]
    };
  });
}
