import {
  fetchShowtimeByCinemaService,
  fetchShowtimeDetailService,
  fetchShowtimeService,
} from "../../Services/showtimeService";
import { STATUS_CODE } from "../../Util/constants/systemConstant.js";
import { actionTypes } from "../Constants/actionTypes";

export const fetchShowtimeThunk = (data) => {
  return (dispatch) => {
    fetchShowtimeService(data)
      .then(({ data, status }) => {
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: actionTypes.SAVE_SHOWTIME_LIST,
            payload: data,
          });
        }
      })
      .catch((error) => console.log(error));
  };
};

export const fetchShowtimeByCinemaThunk = (data) => {
  return (dispatch) => {
    fetchShowtimeByCinemaService(data)
      .then(({ data, status }) => {
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: actionTypes.SAVE_CINEMA_SHOWTIME_LIST,
            payload: data,
          });
        }
      })
      .catch((error) => console.log(error));
  };
};

export const getShowtimeDetailThunk = (data) => {
  return (dispatch) => {
    fetchShowtimeDetailService(data)
      .then(({ data, status }) => {
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: actionTypes.SAVE_SHOWTIME_DETAIL,
            payload: data,
          });
        }
      })
      .catch((error) => console.log(error));
  };
};
