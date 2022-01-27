import { DOMAIN } from "../Util/constants/systemConstant.js";
import request from "./request";

export const getMoviesService = () => {
  return request({
    method: "GET",
    url: `${DOMAIN}/movie`,
  });
};

export const getMovieDetailService = (movieId) => {
  return request({
    method: "GET",
    url: `${DOMAIN}/movie/${movieId}`,
  });
};

export const getMovieByCinemaService = (cinemaId) => {
  return request({
    method: "GET",
    url: `${DOMAIN}/movie/get_movies_by_cinema/${cinemaId}`,
  });
};

export const getShowingMoviesService = () => {
  return request({
    method: "GET",
    url: `${DOMAIN}/movie/get_showing_movies`,
  });
};

export const getFutureMoviesService = () => {
  return request({
    method: "GET",
    url: `${DOMAIN}/movie/get_future_movies`,
  });
};

export const getMovieListByCinemaService = (data) => {
  return request({
    method: "POST",
    url: `${DOMAIN}/movie/get_movies_by_cinema`,
    data,
  });
};
