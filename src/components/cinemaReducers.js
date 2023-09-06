import { createSlice } from "@reduxjs/toolkit";

const cinemaSlice = createSlice({
  name: 'cinemas',
  initialState: [],
  reducers: {
    setCinemas: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCinemas } = cinemaSlice.actions;
export default cinemaSlice.reducer;