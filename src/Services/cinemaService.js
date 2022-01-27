import { DOMAIN } from "../Util/constants/systemConstant.js";
import request from "./request";

const domain = `${DOMAIN}/cinema`;

export const getCinemaDetailService = (id) => {
  return request({
    url: `${domain}/${id}`,
    method: "GET",
  });
};
