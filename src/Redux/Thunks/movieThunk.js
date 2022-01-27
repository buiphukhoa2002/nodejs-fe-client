import {
  getFutureMoviesService,
  getMovieByCinemaService,
  getMovieDetailService,
  getMovieListByCinemaService,
  getMoviesService,
  getShowingMoviesService,
} from "../../Services/movieService";
import { STATUS_CODE } from "../../Util/constants/systemConstant.js";
import { actionTypes } from "./../Constants/actionTypes";

export const getMoviesThunk = (dispatch) => {
  getMoviesService()
    .then(({ data, status }) => {
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: actionTypes.SAVE_MOVIE_LIST,
          payload: data,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getMovieDetailThunk = (movieId) => {
  return (dispatch) => {
    getMovieDetailService(movieId)
      .then(({ data, status }) => {
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: actionTypes.SAVE_MOVIE_DETAIL,
            payload: data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getMoviesByCinemaThunk = (cinemaId) => (dispatch) => {
  getMovieByCinemaService(cinemaId)
    .then(({ data, status }) => {
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: actionTypes.SAVE_MOVIE_LIST,
          payload: data,
        });
      }
    })
    .catch((e) => console.log(e));
};

export const getShowingMoviesThunk = (dispatch) => {
  getShowingMoviesService()
    .then(({ data, status }) => {
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: actionTypes.SAVE_SHOWING_MOVIE_LIST,
          payload: data,
        });
      }
    })
    .catch((error) => console.log(error));
};

export const getFutureMoviesThunk = (dispatch) => {
  getFutureMoviesService()
    .then(({ data, status }) => {
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: actionTypes.SAVE_FUTURE_MOVIE_LIST,
          payload: data,
        });
      }
    })
    .catch((error) => console.log(error));
};

export const getMovieListByCinemaThunk = (cinemaDateInfo) => (dispatch) => {
  getMovieListByCinemaService(cinemaDateInfo)
    .then(({ data, status }) => {
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: actionTypes.SAVE_CINEMA_MOVIE_LIST,
          payload: data,
        });
      }
    })
    .catch((error) => console.log(error));
};
