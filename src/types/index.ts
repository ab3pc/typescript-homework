export type MovieGroup =  "popular" | "top_rated" |"upcoming"

export interface Film {
  id?: string
  release_date: string
  overview?: string
  poster_path?: string
  backdrop_path?: string
}

export interface initialStateTypes {
  page:string
  currentMoviesGroup: MovieGroup
 
}