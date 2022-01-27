import React, { Fragment, useEffect } from "react";
import "./Booking.css";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShowtimeDetailThunk } from "../../Redux/Thunks/showtimeThunk";
import { getSeatListByShowtimeThunk } from "../../Redux/Thunks/seatThunk";
import { actionTypes } from "../../Redux/Constants/actionTypes";
import dayjs from "dayjs";
import { bookTicketsThunk } from "../../Redux/Thunks/ticketThunk";
import { useTranslation } from "react-i18next";
import { openNotification } from "./../../Util/Notification/Notification";

const Booking = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getShowtimeDetailThunk(id));
    dispatch(getSeatListByShowtimeThunk(id));
  }, [dispatch, id]);

  const { seatList, chosenSeats } = useSelector((state) => state.seatReducer);
  const { showtimeDetail } = useSelector((state) => state.showtimeReducer);
  const { user } = useSelector((state) => state.userReducer);

  const renderSeats = () => {
    if (!seatList) return <></>;
    return seatList.map((seat, index) => {
      let classGheVip = seat.type.toLowerCase() === "vip" ? "gheVip" : "";
      let classGheDaDat = seat.status ? "gheDaDat" : "";
      let classGheDangDat = "";
      let indexGheDangDat = chosenSeats.findIndex(
        (chosenSeat) => chosenSeat.id === seat.id
      );
      if (indexGheDangDat !== -1) {
        classGheDangDat = "gheDangDat";
      }

      let classGheDaDuocDat = "";
      if (
        user &&
        seat.Tickets.length > 0 &&
        user.id === seat.Tickets[0].userId
      ) {
        classGheDaDuocDat = "gheDaDuocDat";
      }
      return (
        <Fragment key={index}>
          <button
            disabled={seat.status}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDaDuocDat} ${classGheDangDat}`}
            onClick={() => {
              const index = chosenSeats.findIndex(
                (chosenSeat) => chosenSeat.id === seat.id
              );
              if (index === -1) {
                dispatch({
                  type: actionTypes.SAVE_CHOSEN_SEATS,
                  payload: [...chosenSeats, seat],
                });
              } else {
                chosenSeats.splice(index, 1);
                dispatch({
                  type: actionTypes.SAVE_CHOSEN_SEATS,
                  payload: chosenSeats,
                });
              }
            }}
          >
            {seat.status ? <UserOutlined className="mb-1" /> : seat.name}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  const bookTickets = () => {
    if (!user) {
      alert("Please login before booking");
    }
    if (!chosenSeats || chosenSeats.length === 0) {
      alert("Please choose a seat");
    }
    const ticketList = new Array(chosenSeats.length);
    for (let i = 0; i < chosenSeats.length; i++) {
      ticketList[i] = chosenSeats[i].id;
    }
    const data = {
      seatList: ticketList,
      userId: user.id,
    };

    dispatch(bookTicketsThunk(data, id, bookTicketSuccess));
  };

  const bookTicketSuccess = () => {
    openNotification(
      "success",
      "SUCCESS",
      "You have successfully book your seats. You can view your ticket detail in your profile"
    );
    navigate("/profile");
  };

  return (
    <div style={{ height: "100%" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-9">
            <div className="mx-auto" style={{ width: "80%" }}>
              <div className="bg-dark w-100">&nbsp;</div>
              <div className="trapezoid mx-auto text-center">
                <h3 className="font-weight-bold p-1">{t("datve_screen")}</h3>
              </div>
              <div className="p-3 ml-4">{renderSeats()}</div>
            </div>
            <div className="mx-auto text-center" style={{ width: "80%" }}>
              <div className="row">
                <div className="col-6 col-md-2 mx-auto">
                  <button className="ghe">01</button>
                  <p>{t("datve_available")}</p>
                </div>
                <div className="col-6 col-md-2 mx-auto">
                  <button className="ghe gheVip">01</button>
                  <p>VIP</p>
                </div>
                <div className="col-6 col-md-2 mx-auto">
                  <button className="ghe gheDangDat">01</button>
                  <p>{t("datve_selected_by_me")}</p>
                </div>
                <div className="col-6 col-md-2 mx-auto">
                  <button className="ghe gheDaDuocDat">
                    <UserOutlined />
                  </button>
                  <p>{t("datve_booked_by_me")}</p>
                </div>
                <div className="col-6 col-md-2 mx-auto">
                  <button className="ghe gheDaDat">
                    <UserOutlined />
                  </button>
                  <button className="ghe gheVip gheDaDat">
                    <UserOutlined />
                  </button>
                  <p>{t("datve_booked")}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-md-3 shadow-lg p-3 bg-white rounded"
            style={{
              height: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="top">
              <h4 className="text-center" style={{ color: "green" }}>
                {showtimeDetail && showtimeDetail.Movie.name}
              </h4>
              <h6>
                <b>
                  {showtimeDetail && showtimeDetail.CinemaRoom.Cinema.name} -
                  Room {showtimeDetail && showtimeDetail.CinemaRoom.name}
                </b>
              </h6>
              <h6>
                {t("time")}:{" "}
                {showtimeDetail &&
                  dayjs(showtimeDetail.startTime).format("HH:mm DD/MM/YYYY")}
              </h6>
              <hr />
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <div>
                  <h5 style={{ color: "red" }}>{t("datve_booked_seats")}:</h5>
                </div>
                <div>
                  <span
                    className="font-weight-bold"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {chosenSeats?.reduce((sum, seat, index) => {
                      return (sum += seat.price);
                    }, 0)}{" "}
                    VND
                  </span>
                </div>
              </div>
              <div className="mt-2">
                {chosenSeats
                  ?.sort((item2, item1) => {
                    if (item2.type > item1.type) return -1;
                    if (item2.type < item1.type) return 1;
                    return parseInt(item2.name) > parseInt(item1.name) ? 1 : -1;
                  })
                  .map((seat) => {
                    let classSeat =
                      seat.type.toLowerCase() === "normal"
                        ? "seatThuong"
                        : "seatVip";
                    return (
                      <div
                        className="d-flex justify-content-between"
                        key={seat.id}
                      >
                        <div className={classSeat}>{seat.name}</div>
                        <div>{seat.price} VND</div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="bottom">
              <div className="container-fluid" style={{ padding: 0 }}>
                <button
                  style={{ width: "100%" }}
                  className="btn btn-success"
                  onClick={bookTickets}
                >
                  {t("datve_purchase")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
