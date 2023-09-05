import api from "./api";

export const getMovieList = () => {
    return api.get('/movies')
}

export const findMovie = (id) => {
    return api.get(`/movies/${id}`)
}

export const getShowtimes = () => {
    return api.get('/showtime')
}