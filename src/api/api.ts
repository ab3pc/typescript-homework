import { filmsMap } from '../helpers/mapperFilms';
import { Film, MovieGroup } from './../types/index';
import { apiConfig } from './apiConfig';

export interface fetchMoviesParams {
  movieGroup: MovieGroup
  page?: string
  language?:string 
}


export const fetchMovies = async ({movieGroup = 'popular', page = '1', language='en-US'}:fetchMoviesParams): Promise<any> => {
  const response = await fetch(`${apiConfig.serviceURL}${movieGroup}?api_key=${apiConfig.apiKey}&language=${language}&page=${page}`);
  const data = await response.json();
  const filmsData = filmsMap(data.results)
  return filmsData
} 
