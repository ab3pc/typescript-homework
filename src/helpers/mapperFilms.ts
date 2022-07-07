import { Film } from './../types/index';

export const filmsMap = (arr:any):Film[] => {
  const filmsArr:Film[] = arr.map((item:any) => {
    const filmItem = {
      id: item.id,
      release_date: item.release_date,
      overview: item.overview,
      poster_path: item.poster_path,
      backdrop_path: item.backdrop_path,
    }
        
    return filmItem
  
  })
return filmsArr
}
