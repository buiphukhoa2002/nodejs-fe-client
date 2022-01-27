import {
  getUserLoginService,
  loginWithFacebookService,
  signInService,
  signUpService,
  updatePasswordService,
  updateUserAvatarService,
  updateUserService,
} from "../../Services/userService";
import {
  STATUS_CODE,
  localStorageKeys,
} from "../../Util/constants/systemConstant.js";
import { openNotification } from "../../Util/Notification/Notification";
import { actionTypes } from "../Constants/actionTypes";

export const signInThunk = (data, callback) => {
  return (dispatch) => {
    signInService(data)
      .then(({ data, status }) => {
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: actionTypes.SAVE_USER,
            payload: data,
          });
          localStorage.setItem(localStorageKeys.ACCESS_TOKEN, data.token);
          callback();
        }
      })
      .catch((error) => console.log(error));
  };
};

export const signUpThunk = (data, callback) => {
  return (dispatch) => {
    signUpService(data)
      .then(({ status }) => {
        if (status === STATUS_CODE.CREATE_SUCCESS) {
          callback();
        }
      })
      .catch((error) => console.log(error));
  };
};

export const getUserLoginThunk = (dispatch) => {
  getUserLoginService()
    .then(({ data }) => {
      dispatch({
        type: actionTypes.SAVE_USER,
        payload: data,
      });
    })
    .catch((error) => console.log(error));
};

export const updateUserThunk = (userInfo) => (dispatch) => {
  updateUserService(userInfo)
    .then(({ data, status }) => {
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: actionTypes.SAVE_USER,
          payload: data,
        });
        openNotification(
          "success",
          "SUCCESS",
          "Your account information is updated!"
        );
      }
    })
    .catch((error) => console.log(error));
};

export const updateUserPasswordThunk = (userInfo) => (dispatch) => {
  updatePasswordService(userInfo)
    .then(({ data, status }) => {
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: actionTypes.SAVE_USER,
          payload: data,
        });
        openNotification(
          "success",
          "SUCCESS",
          "Your password is updated successfully!"
        );
      }
    })
    .catch((error) => console.log(error));
};

export const updateUserAvatarThunk = (userInfo) => (dispatch) => {
  updateUserAvatarService(userInfo)
    .then(({ data, status }) => {
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: actionTypes.SAVE_USER,
          payload: data,
        });
      }
    })
    .catch((error) => console.log(error));
};

export const loginWithFacebookThunk =
  (access_token, callback) => (dispatch) => {
    loginWithFacebookService(access_token)
      .then(({ data, status }) => {
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: actionTypes.SAVE_USER,
            payload: data,
          });
          localStorage.setItem(localStorageKeys.ACCESS_TOKEN, data.token);
          callback();
        }
      })
      .catch((error) => console.log(error));
  };
