import { clearContainer } from './index';
import { fetchMovieByName } from './../api/api';
import { Film, InitialStateTypes } from "../types";
import { renderFilmItem } from './renderItems';

interface SearchByNameReturnType {
  newInitialState: InitialStateTypes
  films: Film[] | []
}

export async function searchByName(fetchMore: boolean, initialState: InitialStateTypes, inputElement: HTMLElement): Promise<SearchByNameReturnType | null | undefined> {
  const filmName = (inputElement as HTMLInputElement).value;
  initialState.activeSearch = 'search';

  if (!fetchMore) {
    if (filmName) {
      initialState.page === '1';
    } else {
      alert('please enter some text');
      return null
    }
  }
  const films = await fetchMovieByName(filmName, initialState.page);
  if (films) return { newInitialState: initialState, films: films }
}

export const renderAfterSearch = (films: Film[], initialState: InitialStateTypes, filmContainer: HTMLElement): void => {
  if (initialState.page === '1') {
    if (filmContainer) clearContainer(filmContainer);
  }
  films.forEach((item: Film) => {
    if (filmContainer && initialState.favoritefilms) {
      filmContainer.innerHTML += renderFilmItem(item, initialState.favoritefilms);
    }
  })
}