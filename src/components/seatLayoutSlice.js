import { createSlice } from "@reduxjs/toolkit";

const seatLayoutSlice = createSlice({
    name: "seats",
    initialState:{
        hall: {
            hallNumber: '',
            maxRow: '',
            maxCol: '',
            seats: []
        }
    },
    reducers: {
        loadSeatLayout : (state, action) => {
            state.hall = action.payload;
        }
    }
})

export const { loadSeatLayout } = seatLayoutSlice.actions;
export default seatLayoutSlice.reducer;