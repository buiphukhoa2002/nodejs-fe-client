import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  getFutureMoviesThunk,
  getShowingMoviesThunk,
} from "../../Redux/Thunks/movieThunk";

const printDate = (dateString) => {
  const [year, month, day] = dateString.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
};

const renderStars = (numStars) => {
  let rows = [];
  let rating = parseInt(Number(numStars) / 2);
  if (rating > 5) rating = 5;
  for (let i = 0; i < rating; i++) {
    rows.push(<i className="fas fa-star active" key={i} />);
  }
  if (rating < 5) {
    for (let i = rating; i < 5; i++) {
      rows.push(<i className="fas fa-star" key={i} />);
    }
  }
  return rows;
};

const Movie = () => {
  const { showingMovieList, futureMovieList } = useSelector(
    (state) => state.movieReducer
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    on: false,
    filmUrl: "",
  });

  useEffect(() => {
    dispatch(getShowingMoviesThunk);
    dispatch(getFutureMoviesThunk);
  }, [dispatch]);

  return (
    <section id="new-in" className="container">
      <div id="time">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#dangchieu">
              {t("now_showing")}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#sapchieu">
              {t("coming_soon")}
            </a>
          </li>
        </ul>
      </div>
      <div
        className="tab-content"
        style={{
          pointerEvents: modal.on ? "none" : "",
        }}
      >
        <div className="tab-pane container active" id="dangchieu">
          <div className="row listMovie" id="dangchieu">
            {showingMovieList.map((movie) => {
              return (
                <div className="col-sm-3 mb-4" key={movie.id}>
                  <div
                    className="movie__content"
                    style={{ backgroundImage: `url(${movie.poster})` }}
                  >
                    <div className="movie__hover">
                      <a
                        className="venobox btn btn-trailer"
                        data-vbtype="video"
                      >
                        <i
                          className="fas fa-play"
                          onClick={() => {
                            setModal({
                              on: true,
                              filmUrl: movie.trailer,
                            });
                          }}
                        />
                      </a>
                      <h2
                        onClick={() => {
                          navigate(`/detail/${movie.id}`);
                        }}
                      >
                        {t("book_tickets")}
                      </h2>
                      <p>
                        {t("in_cinema")}: {printDate(movie.startDate)}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3>{movie.name}</h3>
                    <div className="rating">{renderStars(movie.rating)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="tab-pane container" id="sapchieu">
          <div className="row listMovie" id="sapchieu">
            {futureMovieList.map((movie) => {
              return (
                <div className="col-sm-3 mb-4" key={movie.id}>
                  <div
                    className="movie__content"
                    style={{ backgroundImage: `url(${movie.poster})` }}
                  >
                    <div className="movie__hover">
                      <a
                        className="venobox btn btn-trailer"
                        data-vbtype="video"
                      >
                        <i
                          className="fas fa-play"
                          onClick={() => {
                            setModal({
                              on: true,
                              filmUrl: movie.trailer,
                            });
                          }}
                        />
                      </a>
                      <h2
                        onClick={() => {
                          navigate(`/detail/${movie.id}`);
                        }}
                      >
                        {t("book_tickets")}
                      </h2>
                      <p>
                        {t("in_cinema")}: {printDate(movie.startDate)}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3>{movie.name}</h3>
                    <div className="rating">{renderStars(movie.rating)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        {modal.on ? (
          <div
            className="modal_container"
            onClick={() => {
              setModal({
                on: false,
                filmUrl: "",
              });
            }}
          >
            <iframe
              width={window.innerWidth > 560 ? 560 * 2 : 560}
              height={window.innerWidth > 560 ? 315 * 2 : 315}
              src={modal.filmUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default Movie;
