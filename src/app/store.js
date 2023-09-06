import { configureStore } from "@reduxjs/toolkit";
import cinemaSlice from '../components/cinemaReducers';
import movieListReducer from "../components/movieListSlice.js";
import showTimeListReducer from "../components/showTimeListSlice.js";
import seatLayoutReducer from "../components/seatLayoutSlice.js";
import dateOptionsSlice from '../components/dateOptionsReducer';

export const store = configureStore({
  reducer: {
    movie: movieListReducer,
    showtime: showTimeListReducer,
    cinemas: cinemaSlice,
    dateOptions: dateOptionsSlice,
    seat: seatLayoutReducer
  }
});