import { DOMAIN } from "../Util/constants/systemConstant.js";
import request from "./request";

const domain = `${DOMAIN}/ticket`;

export const bookTicketsService = (data) => {
  return request({
    method: "POST",
    url: `${domain}/multiple`,
    data,
  });
};

export const getTicketsByUserService = (userId) => {
  return request({
    method: "GET",
    url: `${domain}/get_tickets_by_user/${userId}`,
  });
};

export const getTicketListByUserService = (userId) => {
  return request({
    method: "GET",
    url: `${domain}/get_ticket_list_by_user/${userId}`,
  });
};

export const printTicketService = (ticketId) => {
  return request({
    method: "GET",
    url: `${domain}/print_ticket/${ticketId}`,
  });
};
