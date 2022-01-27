import { actionTypes } from "../Constants/actionTypes";

const initialState = {
  showtimeList: [], // for detail page
  cinemaShowtimeList: [], // for home booking component
  showtimeDetail: null,
};

const showtimeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_SHOWTIME_LIST:
      return { ...state, showtimeList: payload };

    case actionTypes.SAVE_CINEMA_SHOWTIME_LIST:
      return { ...state, cinemaShowtimeList: payload };

    case actionTypes.SAVE_SHOWTIME_DETAIL:
      return { ...state, showtimeDetail: payload };

    default:
      return state;
  }
};

export default showtimeReducer;
