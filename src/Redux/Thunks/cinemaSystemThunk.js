import {
  getCinemaSystemDetailService,
  getCinemaSystemListService,
} from "../../Services/cinemaSystemService";
import { STATUS_CODE } from "../../Util/constants/systemConstant.js";
import { actionTypes } from "../Constants/actionTypes";

export const getCinemaSystemListThunk = (dispatch) => {
  getCinemaSystemListService()
    .then(({ data, status }) => {
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: actionTypes.SAVE_CINEMA_SYSTEM_LIST,
          payload: data,
        });
      }
    })
    .catch((error) => console.log(error));
};

export const getCinemaSystemDetailThunk = (cinemaSystemId) => (dispatch) => {
  getCinemaSystemDetailService(cinemaSystemId)
    .then(({ data, status }) => {
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: actionTypes.SAVE_CINEMA_SYSTEM_DETAIL,
          payload: data,
        });
      }
    })
    .catch((error) => console.log(error));
};
