export const addFilmToFavorite = (id:string):void => {
  const info = localStorage.getItem('favoriteMovies');
  if(info) {
    let items = JSON.parse(info);
         
      if(items.includes(id)) {
         items = items.filter((item:string) => item !== id );
         localStorage.setItem('favoriteMovies', JSON.stringify(items));     
        return    
      }
      items.push(id)
      localStorage.setItem('favoriteMovies', JSON.stringify(items));
   } else {
    localStorage.setItem('favoriteMovies', JSON.stringify([id]));   
  }

}

export const checkFavoriteFilms = ():[] | void => {
  const info = localStorage.getItem('favoriteMovies');
  if(info) {
    const items = JSON.parse(info);
    return items
  }
}