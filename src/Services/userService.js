import { DOMAIN } from "../Util/constants/systemConstant.js";
import request from "./request";

export const signInService = ({ email, password }) => {
  return request({
    method: "POST",
    url: `${DOMAIN}/auth/sign-in`,
    data: { email, password },
  });
};

export const signUpService = ({ email, password, name, phone }) => {
  return request({
    method: "POST",
    url: `${DOMAIN}/auth/sign-up`,
    data: { email, password, name, phone },
  });
};

export const getUserLoginService = () => {
  return request({
    url: `${DOMAIN}/users/authenticate`,
    method: "GET",
  });
};

export const updateUserService = (data) => {
  return request({
    url: `${DOMAIN}/users/${data.id}`,
    method: "PUT",
    data,
  });
};

export const updatePasswordService = (data) => {
  return request({
    url: `${DOMAIN}/users/password/${data.id}`,
    method: "PUT",
    data,
  });
};

export const updateUserAvatarService = (data) => {
  return request({
    url: `${DOMAIN}/users/update-avatar/${data.id}`,
    method: "POST",
    data: data.data,
  });
};

export const loginWithFacebookService = (access_token) => {
  return request({
    method: "POST",
    url: `${DOMAIN}/auth/facebook/login`,
    data: {
      access_token,
    },
  });
};
