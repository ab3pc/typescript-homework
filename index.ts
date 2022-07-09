import { getFilms, getFavoriteFilms } from './src/index';
import { InitialStateTypes } from './src/types';
import { handleOnFavClick, searchByName, renderAfterSearch } from './src/helpers';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './src/styles/styles.css';
import { MovieGroup } from './src/types/index';

const buttonsWrapper = document.getElementById('button-wrapper');
const loadMore = document.getElementById('load-more');
const searchBtn = document.getElementById('submit');
const filmContainer = document.getElementById('film-container')!;
const favoriteMovies = document.getElementById('favorite-movies');
const inputValue = document.getElementById('search')!;

export const initialState: InitialStateTypes = {
  page: '1',
  currentMoviesGroup: 'popular',
  favoritefilms: [],
  activeSearch: ''
};

(async () => {
  const data = await getFavoriteFilms(initialState);
  if (data) initialState.favoritefilms = data;
})()

getFilms(initialState);

buttonsWrapper?.addEventListener('click', handleCategoriesButtonts)

async function handleCategoriesButtonts(e:MouseEvent) {
  if (e.target instanceof Element) {
    const setCategories = (e.target?.id as MovieGroup);
    initialState.currentMoviesGroup = setCategories; 
    initialState.page = '1';
    if(initialState.currentMoviesGroup) {
      getFilms(initialState);
    }
  }
}

loadMore?.addEventListener('click', () => {
  initialState.page = (+initialState.page + 1).toString();

  if (initialState.activeSearch) {
    handleSearchByName(true, initialState)
  } else getFilms(initialState)
})

/*favorites */
filmContainer?.addEventListener('click', (e) => handleOnFavClick(e, favoriteMovies));
favoriteMovies?.addEventListener('click', (e) => handleOnFavClick(e, favoriteMovies));

/*search */
searchBtn?.addEventListener('click', () => {
  handleSearchByName(false, initialState)
})

export async function handleSearchByName(mode: boolean, initialState: InitialStateTypes): Promise<void> {
  const datas = await searchByName(mode, initialState, inputValue);
  if (datas?.newInitialState.activeSearch) initialState.activeSearch = datas?.newInitialState.activeSearch;
  const films = datas?.films;
  if (films) {
    renderAfterSearch(films, initialState, filmContainer)
  }
}