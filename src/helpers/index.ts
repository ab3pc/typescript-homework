import { getFavoriteFilms } from "..";
import { addFilmToFavorite } from "./addFilmToFavorite";

const favoriteMovies = document.getElementById('favorite-movies');

export const clearContainer = (domElement:HTMLElement ):void => {
  if(domElement) {
    domElement.innerHTML = '';
   }
}


export function handleOnFavClick(e:{target: Element}):void {
  const elem = e?.target?.parentNode?.parentNode?.id
  if(elem) {
    addFilmToFavorite(elem); 
  }

  if(favoriteMovies) clearContainer(favoriteMovies)
  getFavoriteFilms();

  const currentOpacity = document.getElementById(elem)?.querySelector('svg');
  if(currentOpacity) {
    if(currentOpacity.getAttribute('opacity') === '1') {
      currentOpacity.setAttribute('opacity', '0.4')
    } else {
      currentOpacity.setAttribute('opacity', '1')
    }}
  }