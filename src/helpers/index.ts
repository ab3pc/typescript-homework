import { getFavoriteFilms } from "..";
import { initialState } from "../..";
import { addFilmToFavorite, checkFavoriteFilms } from "./addFilmToFavorite";
import { getRandomFilm } from "./getRandomFilm";
import { renderFavoriteFilmItem, renderFilmItem, renderRandomMovie } from './renderItems';
import { searchByName, renderAfterSearch } from './searchByName';

export const clearContainer = (domElement: HTMLElement): void => {
  if (domElement) {
    domElement.innerHTML = '';
  }
}

export function handleOnFavClick(e: MouseEvent, container: HTMLElement | null): void {
  const elem = (((e.target as HTMLElement).parentNode as HTMLElement).parentNode as HTMLElement).id
  if (elem) {
    addFilmToFavorite(elem);
  }
  if (container) clearContainer(container)
  getFavoriteFilms(initialState);

  // handle opacity on heart-icon
  const currentOpacity = document.getElementById(elem)?.querySelector('svg');
  if (currentOpacity) {
    if (currentOpacity.getAttribute('opacity') === '1') {
      currentOpacity.setAttribute('opacity', '0.4')
    } else {
      currentOpacity.setAttribute('opacity', '1')
    }
  }
}

export {
  getRandomFilm,
  checkFavoriteFilms,
  renderFavoriteFilmItem,
  renderFilmItem,
  renderRandomMovie,
  searchByName,
  renderAfterSearch
};