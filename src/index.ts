import { fetchMovies } from "./api/api";
import { Film, initialStateTypes } from "./types";

const filmContainer = document.getElementById('film-container');
const buttonsWrapper = document.getElementById('button-wrapper');
const loadMore = document.getElementById('load-more');

const initialState:initialStateTypes = {
  page: '1',
  currentMoviesGroup: 'popular'
}

buttonsWrapper?.addEventListener('click', async (e) => {
  if (e.target instanceof Element) {
    switch (e.target?.id) {
      case 'upcoming': {
        initialState.currentMoviesGroup = 'upcoming'
        getPopularFilms(initialState);     
        break;
    }
      case 'top_rated': {
        initialState.currentMoviesGroup = 'top_rated'
        getPopularFilms(initialState)
        break;
    }
      case 'popular': {
        initialState.currentMoviesGroup = 'popular'
        getPopularFilms(initialState)
        break;
    }
      default: return
  }
 }
 
})

loadMore?.addEventListener('click', () => {
  initialState.page= (+initialState.page + 1).toString();
  getPopularFilms(initialState)

  
})



export async function render(): Promise<void> {
  getPopularFilms(initialState)
}


export async function getPopularFilms(initialState:initialStateTypes): Promise<void> {
  
  const films = await fetchMovies({movieGroup:initialState.currentMoviesGroup, page:initialState.page});
  if(initialState.page === '1') {
    clearFilmsContainer();
  }  
     films.forEach((item:Film) => {
      if(filmContainer) {
        filmContainer.innerHTML += renderFilmItem(item);
         }
       })
       console.log(initialState);
     
}



export const clearFilmsContainer = ():void => {
  if(filmContainer) {
    filmContainer.innerHTML = '';
   }
}

const renderFilmItem = (item:Film):string => {
  const filmItem = `<div class="col-lg-3 col-md-4 col-12 p-2">
  <div class="card shadow-sm">
      <img src="https://image.tmdb.org/t/p/original/${item.poster_path}">
      <svg xmlns="http://www.w3.org/2000/svg" stroke="red" fill="red" width="50" height="50" class="bi bi-heart-fill position-absolute p-2" viewBox="0 -2 18 22">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
      </svg>
      <div class="card-body">
          <p class="card-text truncate">
              ${item.overview}
          </p>
          <div class="
                  d-flex
                  justify-content-between
                  align-items-center
              ">
              <small class="text-muted">${item.release_date}</small>
          </div>
      </div>
  </div>
</div>`

return filmItem
}
