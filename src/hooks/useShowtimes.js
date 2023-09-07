import { useDispatch } from 'react-redux'
import * as movieApi from "../../src/api/movieApi";
import { resetShowTimes } from '../components/showTimeListSlice'

export const useShowtimes = () => {
    const dispatch = useDispatch();

    async function loadShowtimes(movieId, cinemaId, showDate){
        const response = await movieApi.getShowtimes(movieId, cinemaId, showDate);
        dispatch(resetShowTimes(response.data));
    }

    return {
        loadShowtimes
    }
}