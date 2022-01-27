import axios from "axios";
import { localStorageKeys } from "../Util/constants/systemConstant.js";

const request = ({ method, url, params, data }) => {
  const variables = {
    url,
    data,
    params,
    method,
    headers: {},
  };

  const token = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
  if (token) {
    variables.headers.token = token;
  }

  return axios(variables);
};

export default request;
