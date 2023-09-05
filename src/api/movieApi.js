import api from "./api";

export const getMovieList = () => {
    return api.get('/tickettrove')
}

export const getShowtimes = () => {
    return api.get('/showtime')
}