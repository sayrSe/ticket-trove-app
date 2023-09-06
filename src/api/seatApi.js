import api from "./api";

export const getSeatLayout = (showtimeId) => {
    return api.get(`/showtimes/${showtimeId}/halls`)
}