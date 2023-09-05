const initialState = {
    cinemas: [],
    selectedCinema: null,
    cinemaDetails: {
      movies: [],
    },
  };
  
  const cinemaReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_CINEMAS':
        return {
          ...state,
          cinemas: action.payload,
        };
      case 'SELECT_CINEMA':
        return {
          ...state,
          selectedCinema: action.payload,
        };
      case 'FETCH_CINEMA_DETAILS':
        return {
          ...state,
          cinemaDetails: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default cinemaReducer;
  