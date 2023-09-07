import { configureStore } from "@reduxjs/toolkit";
import cinemaSlice from '../components/cinemaSlice';
import movieListReducer from "../components/movieListSlice.js";
import showTimeListReducer from "../components/showTimeListSlice.js";
import seatLayoutReducer from "../components/seatLayoutSlice.js";
import dateOptionsSlice from '../components/dateOptionsSlice';

export const store = configureStore({
  reducer: {
    movie: movieListReducer,
    showtime: showTimeListReducer,
    cinemaNames: cinemaSlice,
    dateOptions: dateOptionsSlice,
    seat: seatLayoutReducer
  },
});