import { useDispatch } from "react-redux";
import * as seatApi from "../../src/api/seatApi";
import { loadSeatLayout } from "../components/seatLayoutSlice";

export const useSeats = () => {
    const dispatch = useDispatch();

    async function loadSeats(showtimeId){
        const response = await seatApi.getSeatLayout(showtimeId);
        dispatch(loadSeatLayout(response.data));
    }

    return{
        loadSeats
    }
}