import { Film } from "../types";

export const renderFilmItem = (item: Film, favoritefilms: string[]): string => {
  let isFavorite = 0.4;
  if (item.id) {
    if (favoritefilms.includes(item.id.toString())) isFavorite = 1;
  }
  const filmItem = `<div class="col-lg-3 col-md-4 col-12 p-2">
      <div class="card shadow-sm" id=${item.id}>
      <img src="https://image.tmdb.org/t/p/original/${item.poster_path}">
      <svg xmlns="http://www.w3.org/2000/svg" stroke="red" fill="red" opacity=${isFavorite} width="50" height="50" class="bi bi-heart-fill position-absolute p-2" viewBox="0 -2 18 22">
          <path style="cursor:pointer"  fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
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

export const renderFavoriteFilmItem = (item: Film): string => {
  const filmItem = `<div class="col-12 p-2">
  <div class="card shadow-sm" id=${item.id}>
      <img src="https://image.tmdb.org/t/p/original/${item.poster_path}">
      <svg xmlns="http://www.w3.org/2000/svg" stroke="red" fill="red" width="50" height="50" class="bi bi-heart-fill position-absolute p-2" viewBox="0 -2 18 22">
          <path style="cursor:pointer" fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
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

export const renderRandomMovie = (container: HTMLElement, item: Film): void => {
  container.style.background = `url(https://image.tmdb.org/t/p/original/${item.backdrop_path}) center center / cover no-repeat`
  container.innerHTML = `<div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto" style="background-color: #2525258a">
                    <h1 id="random-movie-name" class="fw-light text-light">${item.title}</h1>
                    <p style="min-height:200px;" id="random-movie-description" class="lead text-white">
                       ${item.overview}
                    </p>
                </div>
            </div>`
}