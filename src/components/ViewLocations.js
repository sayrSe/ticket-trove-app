import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchDateOptions, selectCinema, fetchCinemas, getCinemaDetails } from './actions';
import { useMovies } from "../hooks/useMovies";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  FormControl,
  Dialog,
  DialogContent,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ViewLocations = () => {
  const dateOptions = useSelector((state) => state.dateOptions);
  const cinemas = useSelector((state) => state.cinemas);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const movieInfo = location.state && location.state.movieInfo;
  const movieId = location.state && location.state.movieId;
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const { findMovie } = useMovies();

  useEffect(() => {
    findMovie(movieId)
  }, [movieId]);

  
  useEffect(() => {
    dispatch(fetchDateOptions(movieId));
    dispatch(fetchCinemas());
  }, [dispatch]);

  if (!cinemas || cinemas.length === 0) {
    return <div>Loading...</div>;
  }

  const handleCinemaClick = (cinema) => {
    dispatch(selectCinema(cinema));
    dispatch(getCinemaDetails(cinema.id));
    
    setSelectedLocation(cinema.id);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleViewShowtimes = () => {
    if (selectedLocation) {
      navigate('/next-step'); // Replace '/next-step' with correct route
    } else {
      alert('Please select a cinema location.');
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  }

  const grayButtonStyle = {
    backgroundColor: 'gray',
    color: 'white',
  }

  const blackButtonStyle = {
    borderColor: 'black',
    color: 'black',
  };
  
  return (
    <div>
      <div className="movie-poster">
        {movieInfo && (
            <>
              <h3>{movieInfo.title}</h3>
              <p>{movieInfo.release}&nbsp;{movieInfo.rating}&nbsp;{movieInfo.runtime}</p>
              <img src={movieInfo.poster} alt="Movie Poster" />
            </>
          )}
      </div>
      <FormControl>
        <h4>Select Date</h4>
        <Button 
          variant="outlined" 
          onClick={handleOpenDialog} 
          endIcon={<KeyboardArrowDownIcon />}
          style={blackButtonStyle}>
          {formatDate(selectedDate)}
        </Button>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogContent>
            <RadioGroup value={selectedDate} onChange={handleDateChange}>
              {dateOptions.map((dateOption) => (
                <FormControlLabel
                  key={dateOption.id}
                  value={dateOption.startTime}
                  control={<Radio />}
                  label={formatDate(dateOption.startTime)}
                  style={{ flexDirection: 'row-reverse' }}
                />
              ))}
            </RadioGroup>
          </DialogContent>
        </Dialog>
      </FormControl>
      <h4>Select Location</h4>
      <List>
        {cinemas.map((cinema) => (
          <ListItem
            key={cinema.id}
            button
            onClick={() => handleCinemaClick(cinema)}
            selected={selectedLocation === cinema.id}
          >
            <ListItemText
              primary={`${cinema.name}`}
            />
            {selectedLocation === cinema.id && (
              <IconButton color="primary" >
                <CircleIcon style={{ color: '#F2B000'}} />
              </IconButton>
            )}
          </ListItem>
        ))}
      </List>     
      <Button
        variant="contained"
        onClick={handleGoBack}
        style={grayButtonStyle}
      >
        Go Back
      </Button>
      &nbsp;
      &nbsp;
      &nbsp;
      <Button
        variant="contained"
        color="primary"
        onClick={handleViewShowtimes}
        disabled={!(selectedLocation && selectedDate)}
        style={{
          backgroundColor: selectedLocation && selectedDate ? '#00A4BD' : 'gray',
          color: selectedLocation && selectedDate ? '#FAFAFA' : 'white',}}
      >
        View Showtimes
      </Button>      
    </div>
  );
};

export default ViewLocations;