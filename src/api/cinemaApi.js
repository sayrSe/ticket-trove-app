import api from "./api";

export const getCinemas = () => {
  return api.get("/cinemas");
};

export const getCinemaDetails = (id) => {
  return api.get(`/cinemas?${id}`);
};

export const getDate = (movie_id) => {
  return api.get(`/movies/showtime/${movie_id}`);
};