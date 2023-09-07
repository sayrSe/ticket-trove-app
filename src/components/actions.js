import * as cinemaApi from '../api/cinemaApi';
import { setDateOptions } from './dateOptionsSlice';
import { setCinemaNames } from './cinemaSlice';

export const FETCH_ERROR = 'FETCH_ERROR';

export const selectCinema = (cinema) => ({
  type: 'SELECT_CINEMA',
  payload: cinema,
});

export const fetchError = (error) => ({
  type: FETCH_ERROR,
  payload: error,
});

export const fetchDateOptions = (movie_id) => async (dispatch) => {
    try {
      const response = await cinemaApi.getDate(movie_id);
      const dateOptions = response.data;
      dispatch(setDateOptions(dateOptions));
    } catch (error) {
      console.error('Error fetching date options:', error);
    }
};

export const getCinemaDetails = (movie_id) => {
  return async (dispatch) => {
    try {
      const response = await cinemaApi.getCinemaDetails(movie_id);
      const cinemaDetails = response.data;
      dispatch({ type: 'FETCH_CINEMA_DETAILS', payload: cinemaDetails });
    } catch (error) {
      console.error('Error fetching cinema details:', error);
    }
  };
};

export const fetchCinemaNames = (movieId, date) => async (dispatch) => {
  try {
    const cinemaNames = await cinemaApi.getCinemaNames(movieId, date);
    dispatch(setCinemaNames(cinemaNames));
  } catch (error) {
    console.error('Error fetching cinema names:', error);
    dispatch(fetchError(error));
  }
};