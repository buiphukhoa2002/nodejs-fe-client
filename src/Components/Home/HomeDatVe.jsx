import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { getMoviesThunk } from "../../Redux/Thunks/movieThunk";
import {
  getCinemaSystemDetailThunk,
  getCinemaSystemListThunk,
} from "../../Redux/Thunks/cinemaSystemThunk";
import { fetchShowtimeByCinemaThunk } from "../../Redux/Thunks/showtimeThunk";
import { useNavigate } from "react-router-dom";

const renderDates = () => {
  const now = dayjs();

  const rows = [];
  for (let i = 0; i < 7; i++) {
    let newDay = now.add(i, "day");
    rows.push(
      <option value={newDay.toISOString()} key={i}>
        {newDay.format("DD/MM/YYYY")}
      </option>
    );
  }
  return rows;
};

const HomeDatVe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieList } = useSelector((state) => state.movieReducer);
  const { cinemaSystemList, cinemaSystemDetail } = useSelector(
    (state) => state.cinemaSystemReducer
  );
  const { cinemaShowtimeList } = useSelector((state) => state.showtimeReducer);
  const { t } = useTranslation();

  const [data, setData] = useState({
    cinemaId: "",
    movieId: "",
    date: "",
    showtimeId: "",
  });

  useEffect(() => {
    dispatch(getMoviesThunk);
    dispatch(getCinemaSystemListThunk);
  }, [dispatch]);

  const onDataChange = (e) => {
    const newData = { ...data, [e.target.name]: e.target.value };

    const { movieId, date, cinemaId } = newData;
    if (movieId !== "" && date !== "" && cinemaId !== "") {
      dispatch(fetchShowtimeByCinemaThunk(newData));
    }

    setData(newData);
  };

  const handleSubmit = () => {
    navigate(`/booking/${data.showtimeId}`);
  };

  return (
    <div>
      <section id="buy__tickets">
        <h3 className="text-center">{t("book_ticket_now")}</h3>
        <form className="container">
          <div className="form-group">
            <select
              className="form-control"
              name="movieId"
              onChange={onDataChange}
            >
              <option disabled selected value="disabled">
                {t("choose_film")}
              </option>
              {movieList.map((film) => {
                return (
                  <option value={film.id} key={film.id}>
                    {film.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <select
              className="form-control"
              name="date"
              onChange={onDataChange}
            >
              <option disabled selected value="disabled">
                {t("choose_date")}
              </option>
              {renderDates()}
            </select>
          </div>
          <div className="form-group">
            <select
              className="form-control"
              onChange={(e) => {
                dispatch(getCinemaSystemDetailThunk(e.target.value));
              }}
            >
              <option disabled selected value="disabled">
                {t("choose_cinema_system")}
              </option>
              {cinemaSystemList.map((cinemaSystem) => {
                return (
                  <option value={cinemaSystem.id} key={cinemaSystem.id}>
                    {cinemaSystem.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <select
              className="form-control"
              name="cinemaId"
              onChange={onDataChange}
            >
              <option disabled selected value="disabled">
                {t("choose_cinema")}
              </option>
              {cinemaSystemDetail?.Cinemas.map((cinema) => {
                return (
                  <option value={cinema.id} key={cinema.id}>
                    {cinema.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <select
              className="form-control"
              name="showtimeId"
              onChange={onDataChange}
            >
              <option disabled selected value="disabled">
                {t("choose_time")}
              </option>
              {cinemaShowtimeList.CinemaRooms?.map((room) => {
                return room.ShowTimes.map((showtime) => (
                  <option value={showtime.id} key={showtime.id}>
                    {dayjs(showtime.startTime).format("HH:mm")}
                  </option>
                ));
              })}
            </select>
          </div>
        </form>
        <div className="text-center buy__tickets__btn">
          <button
            className="btn"
            onClick={handleSubmit}
            disabled={data.showtimeId === ""}
          >
            {t("book_tickets")}
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomeDatVe;
