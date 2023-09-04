import api from "./api";

export const getMovieList = () => {
    return api.get('/tickettrove')
}