import { createSlice } from "@reduxjs/toolkit";

const movieListSlice = createSlice({
    name: "movies",
    initialState:{
        movieList:[],
        movieDetails: {}
    },
    reducers: {
        resetMovies: (state, action) => {
            state.movieList = action.payload;
        },
        resetMovieDetails: (state, action) => {
            state.movieDetails = action.payload;
        }
    }
});

export const { resetMovies, resetMovieDetails } = movieListSlice.actions;
export default movieListSlice.reducer;