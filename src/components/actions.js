import * as cinemaApi from '../api/cinemaApi';
import { setDateOptions } from './dateOptionsReducer';
import { setCinemas } from './cinemaReducers';

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

export const fetchCinemas = () => async (dispatch) => {
  try {
    const response = await cinemaApi.getCinemas();
    const cinemas = response.data;
    dispatch(setCinemas(cinemas));
  } catch (error) {
    console.error('Error fetching cinemas:', error);
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