import api from "./api";

export const getShowtimeById = (id) => {
    return api.get(`/showtimes/${id}`)
}