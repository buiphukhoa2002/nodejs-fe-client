import { DOMAIN } from "../Util/constants/systemConstant.js";
import request from "./request";

const domain = `${DOMAIN}/cinema_system`;

export const getCinemaSystemListService = () => {
  return request({
    url: domain,
    method: "GET",
  });
};

export const getCinemaSystemDetailService = (id) => {
  return request({
    url: `${domain}/${id}`,
    method: "GET",
  });
};
