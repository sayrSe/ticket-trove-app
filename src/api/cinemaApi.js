import api from "./api";

export const getCinemas = () => {
  return api.get("/cinemas");
};

export const getCinemaDetails = (cinemaId) => {
  return api.get(`/cinemas/${cinemaId}`);
};