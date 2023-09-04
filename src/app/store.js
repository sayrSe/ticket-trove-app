import { configureStore } from "@reduxjs/toolkit";
import movieListReducer from "../components/movieListSlice.js";

export const store = configureStore({
    reducer:{
        movie: movieListReducer
    }
})