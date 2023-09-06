import api from "./api";

export const getSeatLayout = (showtimeId) => {
    return api.get(`/seats/${showtimeId}`)
}