import React from "react";
import HomeDatVe from "../../Components/Home/HomeDatVe";
import HomeMovieList from "../../Components/Home/HomeFilmList";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <div>
        <div id="carousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carousel" data-slide-to={0} className="active" />
            <li data-target="#carousel" data-slide-to={1} />
            <li data-target="#carousel" data-slide-to={2} />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="https://film-book.com/wp-content/uploads/2019/12/no-time-to-die-movie-poster-banner-01-700x400.jpg"
                alt="First slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://wallpaperaccess.com/full/3773393.jpg"
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="https://cdn.advertserve.com/images/cineworld.advertserve.com/servlet/files/1285"
                alt="Third slide"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carousel"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carousel"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
      <HomeMovieList />
      <HomeDatVe />
      {/* <HomeFilmList />
          <HomeDatVe /> */}
    </div>
  );
};

export default Home;
