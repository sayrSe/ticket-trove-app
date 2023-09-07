import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchCinemaNames } from './actions';
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
import { getCinemaNames } from '../api/cinemaApi';

const ViewLocations = () => {
  const [dateOptions, setDateOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const cinemaNames = useSelector((state) => state.cinemaNames);
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

  
  const [selectedLocation, setSelectedLocation] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  

  const { findMovie } = useMovies();

  useEffect(() => {
    findMovie(movieId);
    createDates();
  }, [movieId]);

  const hours = Math.floor((movieInfo.runtime)/60);
  const minutes = (movieInfo.runtime) % 60;

  useEffect(() => {
    if (movieId && selectedDate) {
      dispatch(fetchCinemaNames(movieId, selectedDate));
    }
  }, [movieId, selectedDate]);
  
  const getDateValue = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  const createDates = () => {
      const currentDate = new Date();
      const options = [];
      for (let i = 0; i <= 2; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        const dateValue = getDateValue(date);
        options.push({
          value: dateValue,
          label: formatDate(date)
        });
      }
      setSelectedDate(options[0].value);
      setDateOptions(options);
  }

  const handleCinemaClick = (cinema) => {
    getCinemaNames(movieId, selectedDate);
    setSelectedLocation(cinema.id);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleViewShowtimes = () => {
    if (selectedLocation && selectedDate) {
      const dateObject = new Date(selectedDate);
      const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;
  
      const showtimesPath = `/movies/${movieId}/showtimes?cinemaId=${selectedLocation}&date=${formattedDate}`;
      console.log(showtimesPath);
      navigate(showtimesPath);
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

  console.log("cinemaNames:", cinemaNames);
  
  return (
    <div>
      <div className="movie-poster">
        {movieInfo && (
            <>
              <h3>{movieInfo.title}</h3>
              <p>{movieInfo.releaseDate?.split("-")[0]}&nbsp;◦&nbsp;{movieInfo.rating}&nbsp;◦&nbsp;{hours}h {minutes}mins</p>
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
                  key={dateOption.value}
                  value={dateOption.value}
                  control={<Radio />}
                  label={dateOption.label}
                  labelPlacement="start"
                />
              ))}
            </RadioGroup>
          </DialogContent>
        </Dialog>
      </FormControl>
      <h4>Select Location</h4>
      <List>
          {cinemaNames.map((cinema) => (
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