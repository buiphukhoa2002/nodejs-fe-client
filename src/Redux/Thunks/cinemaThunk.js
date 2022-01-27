import { getCinemaDetailService } from "../../Services/cinemaService";
import { STATUS_CODE } from "../../Util/constants/systemConstant.js";
import { actionTypes } from "../Constants/actionTypes";

export const getCinemaDetailThunk = (cinema_id) => (dispatch) => {
  getCinemaDetailService(cinema_id)
    .then(({ data, status }) => {
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: actionTypes.SAVE_CINEMA_DETAIL,
          payload: data,
        });
      }
    })
    .catch((error) => console.log(error));
};
