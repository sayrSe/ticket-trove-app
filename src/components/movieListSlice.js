import { createSlice } from "@reduxjs/toolkit";

const movieListSlice = createSlice({
    name: "movies",
    initialState:{
        movieList:[]
    },
    reducers: {
        resetMovies: (state, action) => {
            state.movieList = action.payload;
        }
    }
});

export const { resetMovies } = movieListSlice.actions;
export default movieListSlice.reducer;