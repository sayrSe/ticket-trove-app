import { useDispatch } from "react-redux";
import * as cinemaApi from "../../src/api/cinemaApi";
import { setCinemaNames } from "../components/cinemaSlice";

export const useCinemas = () => {
    const dispatch = useDispatch();

    async function findCinemaById(cinemaId){
        const response = await cinemaApi.getCinemaById(cinemaId);
        dispatch(setCinemaNames(response.data));
    }

    return {
        findCinemaById,
    }
}