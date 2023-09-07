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
  Dialog,
  DialogContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Typography,
  Stack,
  Box,
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
      navigate(showtimesPath, {
        state: {
            movieInfo: movieInfo,
            movieId: movieId,
        }
      });
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

  const headerStyle={
    marginLeft: 2,
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontWeight: 'bold'
  }

  const btnContainerStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: '50px'
  }

  const mainLocationContainer = {
    alignItems: 'center',
    justifyContent: 'center',
    width: {
        xs: 1,
        md: 350,
    }
}

const mainContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}

const showItemContainer = {
    width: '100%',
    display: 'flex',
    alignItems: 'left',
    flexDirection: 'column',
    marginBottom: '30px'
}

const showItem = {
  display: 'flex',
  justifyContent: 'space-between',
  width: "90%",
  marginLeft: "15px",

  border: "1px solid rgba(215,215,215,0.5)",
  cursor: 'pointer',
  '&:selected': {
      backgroundColor: '#00A4BD',
  },
}

const showItemDate = {
  display: 'flex',
  justifyContent: 'space-between',
  width: "80%",
  marginLeft: "15px",

  cursor: 'pointer',
  '&:selected': {
      backgroundColor: '#00A4BD',
  },
}

  return (
      <>
        <Grid>
          <Box sx={mainContainer}>
            <Box sx={mainLocationContainer}>
              <Typography variant="h4" style={{ fontWeight: 'bold' }}>View Locations</Typography>
              <Grid sx={{ textAlign: 'left', marginLeft: 2, marginBottom: 1 }}>
                <Typography variant="h6" style={{ fontFamily: "Lucida Sans" }}>{movieInfo.title}</Typography>
                <Typography variant="h8" style={{ fontFamily: "Lucida Sans" }}>{movieInfo.releaseDate?.split("-")[0]}</Typography>
                <Typography variant="h8" style={{ fontFamily: "Lucida Sans" }}> • {movieInfo.rating}</Typography>
                <Typography variant="h8" style={{ fontFamily: "Lucida Sans" }}> • {hours}h {minutes}mins </Typography>
              </Grid>
              <Box
                component='img'
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 350,
                  maxWidth: 250,
                }}
                src={movieInfo.poster}
                alt='Movie Poster'
              >
              </Box>
              <Box>
                <Typography variant="h6" sx={headerStyle}>Select Date:</Typography>
                <Box component="span" sx={showItemDate}>
                  <Button
                    variant="outlined"
                    onClick={handleOpenDialog}
                    endIcon={<KeyboardArrowDownIcon />}
                    style={blackButtonStyle}
                  >
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
                </Box >
                <br>
                </br>
                <Typography variant="h6" sx={headerStyle}>Select Location:</Typography>
                <Box component="span" sx={showItemContainer}>
                  <List>
                    {cinemaNames.map((cinema) => (
                      <ListItem
                        key={cinema.id}
                        button
                        onClick={() => handleCinemaClick(cinema)}
                        selected={selectedLocation === cinema.id}
                        sx={showItem}
                      >
                        <ListItemText
                          primary={`${cinema.name}`}
                        />
                        {selectedLocation === cinema.id && (
                          <IconButton color="primary" >
                            <CircleIcon style={{ color: '#F2B000' }} />
                          </IconButton>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </Box>
            <Stack direction='row' spacing={2} sx={btnContainerStyle}>
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
                disabled={!(selectedDate && selectedLocation)}
                style={{
                  backgroundColor: selectedLocation && selectedDate ? '#00A4BD' : 'gray',
                  color: selectedLocation && selectedDate ? '#FAFAFA' : 'white',
                }}
              >
                View Showtimes
              </Button>
            </Stack>
          </Box>
        </Grid>
      </>
  );

};

export default ViewLocations;