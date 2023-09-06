import { createSlice } from "@reduxjs/toolkit";

const seatLayoutSlice = createSlice({
    name: "seats",
    initialState:{
        seatLayout: {
            showtimeId: '',
            capacity: '',
            maxRow: '',
            seats: []
        }
    },
    reducers: {
        loadSeatLayout : (state, action) => {
            state.seatLayout = action.payload;
        }
    }
})

export const { loadSeatLayout } = seatLayoutSlice.actions;
export default seatLayoutSlice.reducer;