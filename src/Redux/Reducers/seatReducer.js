import { actionTypes } from "../Constants/actionTypes";

const initialState = {
  seatList: [],
  seatDetail: null,
  chosenSeats: [],
};

const seatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_SEAT_LIST:
      return { ...state, seatList: payload };

    case actionTypes.SAVE_SEAT_DETAIL:
      return { ...state, seatDetail: payload };

    case actionTypes.SAVE_CHOSEN_SEATS:
      return { ...state, chosenSeats: payload };

    default:
      return state;
  }
};

export default seatReducer;
