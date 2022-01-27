import { getSeatListByShowtimeService } from "../../Services/seatService";
import { STATUS_CODE } from "../../Util/constants/systemConstant.js";
import { actionTypes } from "../Constants/actionTypes";

export const getSeatListByShowtimeThunk = (showtime_id) => (dispatch) => {
  getSeatListByShowtimeService(showtime_id)
    .then(({ data, status }) => {
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: actionTypes.SAVE_SEAT_LIST,
          payload: data,
        });
      }
    })
    .catch((error) => console.log(error));
};
