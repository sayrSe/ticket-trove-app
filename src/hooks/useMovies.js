import { useDispatch } from "react-redux";
import * as movieApi from "../../src/api/movieApi";
import { resetMovies } from "../components/movieListSlice";

export const useMovies = () => {
    const dispatch = useDispatch();

    async function loadMovies(){
        const response = await movieApi.getMovieList();
        dispatch(resetMovies(response.data));
    }

    return{
        loadMovies
    }
}