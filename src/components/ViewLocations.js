import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCinema, fetchCinemas, getCinemaDetails } from './actions';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ViewLocations = () => {
  //const cinemas = useSelector((state) => state.cinemas);
  //const selectedCinema = useSelector((state) => state.selectedCinema);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movieInfo = {
    name: 'Barbie',
    releaseYear: '2023',
    ageRating: 'PG',
    length: '120 minutes',
    moviePosterUrl: 'https://example.com/movie1.jpg'
  }

  const cinemas = [
    {
      id: 1,
      address: 'Address 1',
    },
    {
      id: 2,
      address: 'Address 2',
    },
  ];

  const selectedCinema = {
    id: 1,
    address: 'Address 1',
  };

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    dispatch(fetchCinemas());
  }, [dispatch]);

  // if (!cinemas || cinemas.length === 0) {
  //   return <div>Loading...</div>;
  // }

  const handleCinemaClick = (cinema) => {
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

  const grayButtonStyle = {
    backgroundColor: 'gray',
    color: 'white',
  }
  

  return (
    <div>
      <div className="movie-poster">
        <h3>{movieInfo.name}</h3>
        <p>{movieInfo.releaseYear}&nbsp;{movieInfo.ageRating}&nbsp;{movieInfo.length}</p>
        <img src={movieInfo.moviePosterUrl} alt="Movie Poster" />
      </div>
      <FormControl>
        <h4>Select Date</h4>
        <Select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="tomorrow">Tomorrow</MenuItem>
          <MenuItem value="dayAfterTomorrow">Day After Tomorrow</MenuItem>
        </Select>
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
              secondary={`Address: ${cinema.address}`}
            />
            {selectedLocation === cinema.id && (<IconButton color="primary"><ArrowForwardIcon style={{ color: 'yellow'}}/></IconButton>)}
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
        disabled={!selectedLocation}
      >
        View Showtimes
      </Button>
    </div>
  );
};

// return (
//   <div>
//       <h2>View Locations</h2>
//       <div className="movie-poster">
//         {/* Movie poster here */}
//         <img src={selectedCinema ? selectedCinema.moviePosterUrl : ''} alt="Movie Poster" />
//       </div>
//       <FormControl>
//         <InputLabel>Select Date</InputLabel>
//         <Select
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//         >
//           {/* Date options here */}
//           <MenuItem value="today">Today</MenuItem>
//           <MenuItem value="tomorrow">Tomorrow</MenuItem>
//           <MenuItem value="dayAfterTomorrow">Day After Tomorrow</MenuItem>
//         </Select>
//       </FormControl>
//       <List>
//         {cinemas.map((cinema) => (
//           <ListItem
//             key={cinema.id}
//             button
//             onClick={() => handleCinemaClick(cinema)}
//             selected={selectedLocation === cinema.id}
//           >
//             <ListItemText
//               primary={cinema.name}
//               secondary={`Address: ${cinema.address}`}
//             />
//             {selectedLocation === cinema.id && (
//               <IconButton color="primary">
//                 <ArrowForwardIcon />
//               </IconButton>
//             )}
//           </ListItem>
//         ))}
//       </List>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleGoBack}
//       >
//         <ArrowBackIcon />
//         Go Back
//       </Button>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleViewShowtimes}
//       >
//         View Showtimes
//         <ArrowForwardIcon />
//       </Button>
//     </div>
  
// );

export default ViewLocations;