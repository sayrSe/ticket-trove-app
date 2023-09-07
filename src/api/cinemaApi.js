import api from "./api";

export const getCinemaNames = (movieId, date) => {
  const apiUrl = `/movies/${movieId}/showtimes?date=${date}`;
  
  return api.get(apiUrl)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getCinemaDetails = (cinemaId) => {
  return api.get(`/cinemas?${cinemaId}`);
};

export const getDate = (movie_id) => {
  return api.get(`/movies/${movie_id}/showtimes`);
};

export const getCinemaById = (id) => {
  return api.get(`/cinemas/${id}`);
};