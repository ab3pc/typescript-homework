import { Film, Result, MovieType } from './../types/index';

export const filmsMap = (arr:Result[]):Film[] => {
  const filmsArr:Film[] = arr.map((item):Film => {
   
    const filmItem = {
      id: item.id,
      title: item.title,
      release_date: item.release_date,
      overview: item.overview,
      poster_path: item.poster_path,
      backdrop_path: item.backdrop_path,
    }
     return filmItem
  
  })
return filmsArr
}

export const favFilmsMap = (item:MovieType):Film => {
  
     const filmItem = {
      id: item.id,
      release_date: item.release_date,
      overview: item.overview,
      poster_path: item.poster_path,
      //backdrop_path: item.backdrop_path,
    }
     return filmItem
}

