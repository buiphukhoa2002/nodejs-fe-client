import { DOMAIN } from "../Util/constants/systemConstant.js";
import request from "./request";

const domain = `${DOMAIN}/seat`;

export const getSeatListByShowtimeService = (showtime_id) => {
  return request({
    method: "GET",
    url: `${domain}/get-seats-by-showtime/${showtime_id}`,
  });
};

export const getSeatDetailService = (id) => {
  return request({
    method: "GET",
    url: `${domain}/${id}`,
  });
};
