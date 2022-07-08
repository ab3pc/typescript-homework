import { fetchMovie, fetchMovies } from "./api/api";
import { checkFavoriteFilms, clearContainer, getRandomFilm, renderFavoriteFilmItem, renderFilmItem, renderRandomMovie } from "./helpers";
import { Film, InitialStateTypes } from "./types";

const filmContainer = document.getElementById('film-container')!;
const favoriteMovies = document.getElementById('favorite-movies');
const inputValue = document.getElementById('search')!;
const randomMovieContainer = document.getElementById('random-movie');

export async function getFilms(initialState: InitialStateTypes): Promise<void> {
  if (initialState.activeSearch) {
    initialState.activeSearch = '';
    initialState.page = '1';
    (inputValue as HTMLInputElement).value = '';
  }

  const films = await fetchMovies({ movieGroup: initialState.currentMoviesGroup, page: initialState.page });
  if (initialState.page === '1') {
    if (filmContainer) clearContainer(filmContainer);
    const poster = getRandomFilm(films);
    if (randomMovieContainer) {
      renderRandomMovie(randomMovieContainer, poster)
    }
  }
 
  films.forEach((item: Film) => {
    if (filmContainer && initialState.favoritefilms) {
      filmContainer.innerHTML += renderFilmItem(item, initialState.favoritefilms);
    }
  })

}

export async function getFavoriteFilms(initialState: InitialStateTypes): Promise<string[] | null> {
  const favFilms = checkFavoriteFilms();
  initialState.favoritefilms = favFilms;
  if (favFilms) {
    const favoriteFilms = await Promise.all(favFilms.map(async (film) => {
      const item = await fetchMovie(film);
      return item
    }))
    favoriteFilms.reverse().forEach((item: Film) => {
      if (favoriteMovies) {
        favoriteMovies.innerHTML += renderFavoriteFilmItem(item);
      }
    })
  }

  return initialState.favoritefilms
}





