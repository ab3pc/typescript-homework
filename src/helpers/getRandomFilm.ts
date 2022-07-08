import { Film } from "../types";

export const getRandomFilm = (items:Film[]):Film => {
  const rand = Math.floor((Math.random() * (items.length))) ;
     return items[rand]

}