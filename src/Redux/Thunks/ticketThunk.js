import {
  bookTicketsService,
  getTicketListByUserService,
  getTicketsByUserService,
  printTicketService,
} from "../../Services/ticketService";
import { STATUS_CODE } from "../../Util/constants/systemConstant.js";
import { actionTypes } from "../Constants/actionTypes";
import { getSeatListByShowtimeThunk } from "./seatThunk";

export const bookTicketsThunk =
  (payload, showtime_id, callback = () => {}) =>
  (dispatch) => {
    bookTicketsService(payload)
      .then(({ status }) => {
        if (status === STATUS_CODE.CREATE_SUCCESS) {
          dispatch({
            type: actionTypes.SAVE_CHOSEN_SEATS,
            payload: [],
          });
          dispatch(getSeatListByShowtimeThunk(showtime_id));
          callback();
        }
      })
      .catch((error) => console.log(error));
  };

export const getTicketsThunk = (userId) => (dispatch) => {
  getTicketsByUserService(userId)
    .then(({ data, status }) => {
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: actionTypes.SAVE_TICKET_LIST,
          payload: data,
        });
      }
    })
    .catch((error) => console.log(error));
};

export const getTicketListByUserThunk = (userId) => (dispatch) => {
  getTicketListByUserService(userId)
    .then(({ data, status }) => {
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: actionTypes.SAVE_TICKET_LIST,
          payload: data,
        });
      }
    })
    .catch((error) => console.log(error));
};

export const printTicketThunk = (ticketId) => (dispatch) => {
  printTicketService(ticketId)
    .then(({ data, status }) => {
      if (status === STATUS_CODE.SUCCESS) {
        window.open(data, "_blank");
      }
    })
    .catch((error) => console.log(error));
};
