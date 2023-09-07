import { useDispatch } from "react-redux";
import * as cinemaApi from "../../src/api/cinemaApi";
import { setCinemaNames } from "../components/cinemaSlice";
import { setHallNames } from "../components/hallSlice";

export const useCinemas = () => {
    const dispatch = useDispatch();

    async function findCinemaById(cinemaId){
        const response = await cinemaApi.getCinemaById(cinemaId);
        dispatch(setCinemaNames(response.data));
    }

    async function findHallById(hallId){
        const response = await cinemaApi.getHallById(hallId);
        dispatch(setHallNames(response.data))
    }

    return {
        findCinemaById,
        findHallById,
    }
}