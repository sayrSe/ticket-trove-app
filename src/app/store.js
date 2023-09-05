import { configureStore } from "@reduxjs/toolkit";
import cinemaReducer from '../components/reducers';
import movieListReducer from "../components/movieListSlice.js";
import showTimeListReducer from "../components/showTimeListSlice.js";

export const store = configureStore({
  reducer: {
    movie: movieListReducer,
    showtime: showTimeListReducer,
    cinema: cinemaReducer
  }
});