import { actionTypes } from "../Constants/actionTypes";

const initialState = {
  movieList: [],
  movieDetail: {},
  showingMovieList: [],
  futureMovieList: [],
  cinemaMovieList: [],
};

const movieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_MOVIE_LIST:
      state.movieList = payload;
      return { ...state };

    case actionTypes.SAVE_MOVIE_DETAIL:
      state.movieDetail = payload;
      return { ...state };

    case actionTypes.SAVE_SHOWING_MOVIE_LIST:
      return { ...state, showingMovieList: payload };

    case actionTypes.SAVE_FUTURE_MOVIE_LIST:
      return { ...state, futureMovieList: payload };

    case actionTypes.SAVE_CINEMA_MOVIE_LIST:
      return { ...state, cinemaMovieList: payload };

    default:
      return state;
  }
};

export default movieReducer;
