import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserLoginThunk } from "./Redux/Thunks/userThunk";
import HomeTemplate from "./Templates/HomeTemplate";
import AuthTemplate from "./Templates/AuthTemplate";
import BookTicketTemplate from "./Templates/BookTicketTemplate";
import Home from "./Views/Home/Home";
import SignIn from "./Views/SignIn/SignIn";
import SignUp from "./Views/SignUp/SignUp";
import Movie from "./Views/Movie/Movie";
import Contact from "./Views/Contact/Contact";
import Detail from "./Views/Detail/Detail";
import Search from "./Views/Search/Search";
import Booking from "./Views/Booking/Booking";
import Profile from "./Views/Profile/Profile";
import CinemaSystem from "./Views/CinemaSystem/CinemaSystem";
import Cinema from "./Views/Cinema/Cinema";
import Showtime from "./Views/Showtime/Showtime";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserLoginThunk);
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeTemplate children={<Home />} />} />
        <Route path="/movie" element={<HomeTemplate children={<Movie />} />} />
        <Route
          path="/contact"
          element={<HomeTemplate children={<Contact />} />}
        />
        <Route
          path="/detail/:id"
          element={<HomeTemplate children={<Detail />} />}
        />
        <Route
          path="/search/:keyword"
          element={<HomeTemplate children={<Search />} />}
        />
        <Route
          path="/profile"
          element={<HomeTemplate children={<Profile />} />}
        />
        <Route
          path="/cinema_system"
          element={<HomeTemplate children={<CinemaSystem />} />}
        />
        <Route
          path="/cinema/:id" // cinema system id
          element={<HomeTemplate children={<Cinema />} />}
        />
        <Route
          path="/showtime"
          element={<HomeTemplate children={<Showtime />} />}
        />

        <Route
          path="/booking/:id"
          element={<BookTicketTemplate children={<Booking />} />}
        />
        <Route
          path="/signin"
          element={<AuthTemplate children={<SignIn />} />}
        />
        <Route
          path="/signup"
          element={<AuthTemplate children={<SignUp />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
