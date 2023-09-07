import { createSlice } from "@reduxjs/toolkit";

const showTimeListSlice = createSlice({
    name: "showtimes",
    initialState:{
        showtimes:[]
    },
    reducers: {
        resetShowTimes: (state, action) => {
            state.showtimes = action.payload;
        }
    }
});

export const { resetShowTimes } = showTimeListSlice.actions;
export default showTimeListSlice.reducer;