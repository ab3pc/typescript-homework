import { favFilmsMap, filmsMap } from '../helpers/mapperFilms';
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
export const fetchMovie = async (id: string): Promise<any> => {
  const response = await fetch(`${apiConfig.serviceURL}${id}?api_key=${apiConfig.apiKey}&language=en-US`);
  const data = await response.json();
  const filmsData = favFilmsMap(data)
  return filmsData
} 

export const fetchMovieByName = async (name: string, page = "1"): Promise<any> => {
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiConfig.apiKey}&language=en-US&query=${name}&page=${page}&include_adult=false`);
  const data = await response.json();
  const filmsData = filmsMap(data.results)
  return filmsData
} 
