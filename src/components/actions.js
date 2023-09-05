import * as cinemaApi from '../api/cinemaApi';

export const selectCinema = (cinema) => ({
  type: 'SELECT_CINEMA',
  payload: cinema,
});

export const fetchCinemas = () => {
  return async (dispatch) => {
    try {
      const response = await cinemaApi.getCinemas();
      const cinemas = response.data;
      // Dispatch an action to update state with the fetched cinemas.
      dispatch({ type: 'FETCH_CINEMAS', payload: cinemas });
    } catch (error) {
      // Handle errors here.
    }
  };
};

export const getCinemaDetails = (cinemaId) => {
  return async (dispatch) => {
    try {
      const response = await cinemaApi.getCinemaDetails(cinemaId);
      const cinemaDetails = response.data;
      // Dispatch an action to update state with the fetched cinema details.
      dispatch({ type: 'FETCH_CINEMA_DETAILS', payload: cinemaDetails });
    } catch (error) {
      // Handle errors here.
    }
  };
};