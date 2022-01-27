import { actionTypes } from "../Constants/actionTypes";

const initialState = {
  cinemaDetail: null,
};

const cinemaReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_CINEMA_DETAIL:
      return { ...state, cinemaDetail: payload };

    default:
      return state;
  }
};

export default cinemaReducer;
