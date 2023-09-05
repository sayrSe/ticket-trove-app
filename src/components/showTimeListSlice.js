import { createSlice } from "@reduxjs/toolkit";

const showTimeListSlice = createSlice({
    name: "showtimes",
    initialState:{
        showTimeList:[]
    },
    reducers: {
        resetShowTimes: (state, action) => {
            state.showTimeList = action.payload;
        }
    }
});

export const { resetShowTimes } = showTimeListSlice.actions;
export default showTimeListSlice.reducer;