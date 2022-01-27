import { DOMAIN } from "../Util/constants/systemConstant.js";
import request from "./request";

const domain = `${DOMAIN}/showtime`;

export const fetchShowtimeService = (data) => {
  return request({
    url: `${domain}/fetch`,
    method: "POST",
    data,
  });
};

export const fetchShowtimeByCinemaService = (data) => {
  return request({
    url: `${domain}/fetch_by_cinema`,
    method: "POST",
    data,
  });
};

export const fetchShowtimeDetailService = (id) => {
  return request({
    url: `${domain}/${id}`,
    method: "GET",
  });
};
