import { renderFavoriteFilmItem, renderFilmItem } from './helpers/renderItems';
import { fetchMovie, fetchMovieByName, fetchMovies } from "./api/api";
import { clearContainer, handleOnFavClick } from "./helpers";
import { checkFavoriteFilms } from "./helpers/addFilmToFavorite";
import { Film, InitialStateTypes } from "./types";

const filmContainer = document.getElementById('film-container');
const buttonsWrapper = document.getElementById('button-wrapper');
const loadMore = document.getElementById('load-more');
const favoriteMovies = document.getElementById('favorite-movies');
const searchBtn = document.getElementById('submit');
const inputValue = document.getElementById('search');


const initialState:InitialStateTypes = {
  page: '1',
  currentMoviesGroup: 'popular',
  favoritefilms: [],
  activeSearch: ''
}

export async function render(): Promise<void> {
  getFilms(initialState) 
  getFavoriteFilms();
 
}

buttonsWrapper?.addEventListener('click', async (e) => {
  if (e.target instanceof Element) {
    switch (e.target?.id) {
      case 'upcoming': {
        initialState.currentMoviesGroup = 'upcoming'
        initialState.page='1'
        getFilms(initialState);     
        break;
    }
      case 'top_rated': {
        initialState.currentMoviesGroup = 'top_rated'
        initialState.page='1'
        getFilms(initialState)
        break;
    }
      case 'popular': {
        initialState.currentMoviesGroup = 'popular'
        initialState.page='1'
        getFilms(initialState)
        break;
    }
      default: return
  }
 }
 
})

loadMore?.addEventListener('click', () => {
  initialState.page= (+initialState.page + 1).toString();
  if(initialState.activeSearch) {
    searchByName(true)
  } else getFilms(initialState) 
})


export async function getFilms(initialState:InitialStateTypes): Promise<void> {
  if( initialState.activeSearch) {
    initialState.activeSearch = '';
    initialState.page = '1';
    inputValue.value = '';
  }


    const films = await fetchMovies({movieGroup:initialState.currentMoviesGroup, page:initialState.page});
  if(initialState.page === '1') {
      if(filmContainer) clearContainer(filmContainer);
  }  
     films.forEach((item:Film) => {
      if(filmContainer) {
        filmContainer.innerHTML += renderFilmItem(item, initialState.favoritefilms);
         }
       })
    
}
export async function getFavoriteFilms(): Promise<void> {
  const favFilms =  checkFavoriteFilms();
  initialState.favoritefilms = favFilms;
  const favoriteFilms = await Promise.all(favFilms.map(async(film) => {
    const item = await fetchMovie(film);
    return item
  })) 

  favoriteFilms.reverse().forEach((item:Film) => {
    if(favoriteMovies) {
      favoriteMovies.innerHTML += renderFavoriteFilmItem(item);
       }
     })
    
}

/*favorites */
filmContainer?.addEventListener('click', handleOnFavClick);
favoriteMovies?.addEventListener('click', handleOnFavClick);
searchBtn?.addEventListener('click', () =>  searchByName(false))

 async function searchByName (fetchMore:boolean): Promise<void> {
  const filmName = inputValue.value;
  initialState.activeSearch = 'search';

  if(!fetchMore) {
      if(filmName) {
      initialState.page === '1';
  }  else alert('please enter some text')
 }

   const films = await fetchMovieByName(filmName, initialState.page);
 
    if(initialState.page === '1') {
      if(filmContainer) clearContainer(filmContainer);
  }  
     films.forEach((item:Film) => {

      if(filmContainer) {
        filmContainer.innerHTML += renderFilmItem(item, initialState.favoritefilms);
         }
       })  

  

}

  