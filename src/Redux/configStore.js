import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import movieReducer from "./Reducers/movieReducer";
import userReducer from "./Reducers/userReducer";
import cinemaSystemReducer from "./Reducers/cinemaSystemReducer";
import showtimeReducer from "./Reducers/showtimeReducer";
import seatReducer from "./Reducers/seatReducer";
import ticketReducer from "./Reducers/ticketReducer";
import cinemaReducer from "./Reducers/cinemaReducer";
import languageReducer from "./Reducers/languageReducer";

const rootReducer = combineReducers({
  movieReducer,
  userReducer,
  cinemaSystemReducer,
  showtimeReducer,
  seatReducer,
  ticketReducer,
  cinemaReducer,
  languageReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
