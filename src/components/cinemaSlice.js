import { createSlice } from "@reduxjs/toolkit";

const cinemaSlice = createSlice({
  name: 'cinemaNames',
  initialState: [],
  reducers: {
    setCinemaNames: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCinemaNames } = cinemaSlice.actions;
export default cinemaSlice.reducer;