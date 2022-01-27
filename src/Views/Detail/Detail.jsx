import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCinemaSystemListThunk } from "../../Redux/Thunks/cinemaSystemThunk";
import { getMovieDetailThunk } from "../../Redux/Thunks/movieThunk";
import { fetchShowtimeThunk } from "../../Redux/Thunks/showtimeThunk";
import "./Detail.css";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const mapWeekDayToText = (weekday) => {
  switch (weekday) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    default:
      return "Saturday";
  }
};

const printTime = (time) => {
  if (!time) return "TBD";
  const [hour, min] = time.split(":");
  let hourMsg = "";
  let minMsg = "";
  let connector = "";
  if (hour > 0) {
    if (hour === 1) hourMsg = "1 hour";
    else hourMsg = `${hour} hours`;
  }
  if (min > 0) {
    if (min === 1) minMsg = "1 minute";
    else minMsg = `${min} minutes`;
  }
  if (hour > 0 && min > 0) {
    connector = " and ";
  }
  return `${hourMsg}${connector}${minMsg}`;
};

const Detail = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [system, setSystem] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    dispatch(getMovieDetailThunk(params.id));
    dispatch(getCinemaSystemListThunk);
  }, [dispatch, params.id]);

  const movieDetail = useSelector((state) => state.movieReducer.movieDetail);
  const { cinemaSystemList } = useSelector(
    (state) => state.cinemaSystemReducer
  );
  const { showtimeList } = useSelector((state) => state.showtimeReducer);

  const renderDates = () => {
    let arrDates = new Array(7);
    for (let i = 0; i < 7; i++) {
      let newDate = dayjs().add(i, "day");
      arrDates[i] = (
        <TabPane
          tab={
            <div
              className="text-center p-2"
              style={{
                fontWeight: newDate.date() === dayjs(date).date() ? "bold" : "",
                color:
                  newDate.date() === dayjs(date).date() ? "orange" : "black",
              }}
            >
              {mapWeekDayToText(newDate.day())} <br />
              {newDate.format("DD/MM")}
            </div>
          }
          key={newDate.toISOString()} // e.g. 1640813683303
        ></TabPane>
      );
    }
    return arrDates;
  };

  const onCinemaSystemChange = (key) => {
    if (date) {
      const data = {
        movieId: params.id,
        date,
        cinemaSystemId: key,
      };
      dispatch(fetchShowtimeThunk(data));
    }
    setSystem(key);
  };

  const onDateChange = (key) => {
    if (system) {
      const data = {
        movieId: params.id,
        date: key,
        cinemaSystemId: system,
      };
      dispatch(fetchShowtimeThunk(data));
    }
    setDate(key);
  };

  const renderShowtimes = () => {
    if (!showtimeList || !showtimeList.Cinemas) return <></>;
    return showtimeList.Cinemas.map((cinema) => {
      return (
        <div key={cinema.id}>
          <h4>{cinema.name}</h4>
          {cinema.CinemaRooms.map((room) => {
            return room.ShowTimes.map((showtime) => {
              return (
                <button
                  className="mr-3 btn btn-secondary"
                  key={showtime.id}
                  onClick={() => navigate(`/booking/${showtime.id}`)}
                >
                  {dayjs(showtime.startTime).format("HH:mm")}
                </button>
              );
            });
          })}
          <hr />
        </div>
      );
    });
  };

  return (
    <div>
      <section id="detail">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4 detail__left">
              <img src={movieDetail.poster} alt="film" />
            </div>
            <div className="col-12 col-sm-6 col-md-8 detail__right">
              <h2 className="detail__right__title">{movieDetail.name}</h2>
              <p className="detail__right__rating">
                <i className="fas fa-star"></i> <b>{movieDetail.rating}</b> / 10
              </p>
              <p className="detail__right__dates">
                {t("in_cinema")}:{" "}
                <b>
                  {movieDetail.startDate &&
                    dayjs(movieDetail.ngayKhoiChieu).format("DD/MM/YYYY")}
                </b>
              </p>
              <p style={{ fontSize: "1.25rem" }}>
                Directors: {movieDetail.director}
              </p>
              <p style={{ fontSize: "1.25rem" }}>
                Duration: {printTime(movieDetail.duration)}
              </p>
              <div className="detail__right__description">
                <p className="description__title">{t("description")}:</p>
                <p>{movieDetail.description}</p>
              </div>

              <div className="detail__right__button">
                <button className="btn btn__trailer">
                  <a
                    href={movieDetail.trailer}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("watch_trailer")}
                  </a>
                </button>
                <a className="btn btn__buy" href="#detail_book_ticket">
                  {t("book_tickets")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mt-3 movie__detail">
        <div id="book_ticket" className="mt-5">
          <div className="row">
            <div className="col-12 col-md-2">
              {cinemaSystemList.map((cinemaSystem) => {
                return (
                  <div className="mb-4">
                    <img
                      src={cinemaSystem.logo}
                      style={{
                        cursor: "pointer",
                        opacity: system === cinemaSystem.id ? 1 : 0.3,
                        border:
                          system === cinemaSystem.id
                            ? "2px solid black"
                            : "none",
                      }}
                      alt="cinema"
                      width="100"
                      className="d-block mb-2"
                      onClick={() => onCinemaSystemChange(cinemaSystem.id)}
                    ></img>
                  </div>
                );
              })}
            </div>
            <div className="col-12 col-md-10">
              <Tabs size="large" onChange={onDateChange} activeKey={date}>
                {renderDates()}
              </Tabs>
              {renderShowtimes()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
