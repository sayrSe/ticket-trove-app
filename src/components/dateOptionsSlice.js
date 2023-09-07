import { createSlice } from '@reduxjs/toolkit';

const dateOptionsSlice = createSlice({
  name: 'dateOptions',
  initialState: [],
  reducers: {
    setDateOptions: (state, action) => {
      return action.payload;
    },
  },
});

export const { setDateOptions } = dateOptionsSlice.actions;
export default dateOptionsSlice.reducer;
