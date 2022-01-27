import { actionTypes } from "../Constants/actionTypes";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_USER:
      state.user = payload;
      return { ...state };

    default:
      return state;
  }
};

export default userReducer;
