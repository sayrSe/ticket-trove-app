import { useDispatch } from "react-redux";
import * as movieApi from "../../src/api/movieApi";
import { resetMovies, resetMovieDetails } from "../components/movieListSlice";

export const useMovies = () => {
    const dispatch = useDispatch();

    async function loadMovies(){
        const response = await movieApi.getMovieList();
        dispatch(resetMovies(response.data));
    }

    async function findMovie(id){
        const response = await movieApi.findMovie(id);
        dispatch(resetMovieDetails(response.data));
    }

    return{
        loadMovies,
        findMovie
    }
}