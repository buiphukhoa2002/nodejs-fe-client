import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import { getCinemaSystemDetailThunk } from "../../Redux/Thunks/cinemaSystemThunk";
import { getCinemaDetailThunk } from "../../Redux/Thunks/cinemaThunk";
import { getMovieListByCinemaThunk } from "../../Redux/Thunks/movieThunk";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import "./Showtime.css";
import { useCallback } from "react";

const Showtime = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const { cid, csid } = Object.fromEntries(urlSearchParams);
  const navigate = useNavigate();
  const now = dayjs();
  const [date, setDate] = useState(now);

  const mapWeekDayToText = (weekday) => {
    switch (weekday) {
      case 0:
        return t("sunday").toUpperCase();
      case 1:
        return t("monday").toUpperCase();
      case 2:
        return t("tuesday").toUpperCase();
      case 3:
        return t("wednesday").toUpperCase();
      case 4:
        return t("thursday").toUpperCase();
      case 5:
        return t("friday").toUpperCase();
      default:
        return t("saturday").toUpperCase();
    }
  };

  useEffect(() => {
    dispatch(getCinemaSystemDetailThunk(csid));
    dispatch(getCinemaDetailThunk(cid));
    dispatch(getMovieListByCinemaThunk({ cinemaId: cid }));
  }, [dispatch, csid, cid]);

  const { cinemaSystemDetail } = useSelector(
    (state) => state.cinemaSystemReducer
  );
  const { cinemaDetail } = useSelector((state) => state.cinemaReducer);
  const { cinemaMovieList } = useSelector((state) => state.movieReducer);

  const changeDate = useCallback(
    (dateSelected) => {
      dispatch(
        getMovieListByCinemaThunk({
          cinemaId: cid,
          date: dateSelected.toDate(),
        })
      );
      setDate(dateSelected);
    },
    [cid, dispatch]
  );

  return (
    <div className="container mt-3">
      <Breadcrumb style={{ fontSize: 20 }}>
        <Breadcrumb.Item
          onClick={() => navigate("/cinema-system")}
          style={{ cursor: "pointer" }}
        >
          {t("cinema_system")}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => navigate(`/cinema/${cinemaDetail?.cinemaSystemId}`)}
          style={{ cursor: "pointer" }}
        >
          {cinemaSystemDetail ? cinemaSystemDetail.name : ""}'s Cinemas
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {cinemaDetail ? cinemaDetail.name : ""}
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="showtimeSelect">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          let newDate = now.add(i, "day");
          let classSelected =
            date.date() === newDate.date()
              ? "showtimeSelect__item__selected"
              : "";
          return (
            <div
              key={i}
              className={`showtimeSelect__item ${classSelected}`}
              onClick={() => changeDate(newDate)}
            >
              {mapWeekDayToText(newDate.day())} <br />
              {newDate.format("DD/MM")}
            </div>
          );
        })}
      </div>

      <div className="showtimeMovieList">
        {cinemaMovieList.map((movie) => {
          return (
            <div className="showtimeMovie row" key={movie.id}>
              <div className="col-2">
                <img src={movie.poster} alt="movie poster" />
              </div>
              <div className="col-10">
                <h3>{movie.name}</h3>
                <p>Duration: {movie.duration}</p>
                <p>
                  {movie.ShowTimes?.map((showtime) => (
                    <button
                      key={showtime.id}
                      onClick={() => navigate("/booking/" + showtime.id)}
                    >
                      {dayjs(showtime.startTime).format("HH:mm")}
                    </button>
                  ))}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Showtime;
