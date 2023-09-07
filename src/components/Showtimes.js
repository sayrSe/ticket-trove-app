import { Grid, IconButton, ListItemText, ListItem, Box, Typography, Stack, Button } from "@mui/material"
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import CircleIcon from '@mui/icons-material/Circle';
import { useMovies } from '../hooks/useMovies';
import { useShowtimes } from '../hooks/useShowtimes';
import { useCinemas } from '../hooks/useCinemas';

const btnContainerStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: '50px'
}

const backBtnStyle = {
    backgroundColor: '#666',
    width: '150px',
    height: '55px',
    color: '#FAFAFA',
    fontSize: '20px',
    fontWeight: '700',
    margin: 0,
    '&:hover': {
        backgroundColor: '#aaa',
        color: '#FAFAFA',
    }
}
const selectSeatStyle = {
    backgroundColor: '#00A4BD',
    width: '194px',
    height: '55px',
    fontSize: '20px',
    fontWeight: '700',
    color:'#FAFAFA',
    '&:disabled': {
        backgroundColor: '#B9B9B9',
        color: '#FAFAFA',
    },
    '&:hover': {
        color:'#FAFAFA',
        backgroundColor:'#F2B000'
    }
}
const showTimeItem = {
    display: 'flex',
    justifyContent: 'space-between',
    width: "80%",

    border: "1px solid rgba(215,215,215,0.5)",
    cursor: 'pointer',
    '&:selected': {
        backgroundColor: '#00A4BD',
    },
}
const headerStyle={
    marginLeft: 2,
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontWeight: 'bold'
}

const spanStyle = {
    marginLeft: 2,
    alignSelf: 'flex-start',
    marginBottom: 1.5
}

const showtimeItemContainer = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: '30px'
}

const bookingDetailsContainer = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '20px',
}

const mainShowTimeContainer = {
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

const Showtimes = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const cinema = useSelector((state) => state.cinemaNames)
    const showtimes = useSelector((state) => state.showtime.showtimes)

    const { findMovie } = useMovies();
    const { loadShowtimes } = useShowtimes();
    const { findCinemaById, findHallById } = useCinemas();

    const parameters = new URLSearchParams(location.search);
    const movieInfo = location.state && location.state.movieInfo;
    const cinemaId = parameters.get('cinemaId');
    const movieId = location.state && location.state.movieInfo.id;
    const showDate = parameters.get('date');

    const [selectedState, setSelectedState] = useState(false);
    const [selectedShowtime, setSelectedShowtime] = useState('');
    const [selectedHall, setSelectedHall] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        loadShowtimes(movieId, cinemaId, showDate);
        findCinemaById(cinemaId);
    }, [])


    const handleGoBack = () => {
        navigate(-1);
    }
    const handleSeatSelection = () => {
        navigate(`/cinemas/seats?showtime_id=${selectedShowtime}`);
    }

    const handleShowtimeClick = (showtime) => {
        setSelectedShowtime(showtime.id)
        setSelectedHall(showtime.hallId)
        setSelectedState(!selectedState)
        setIsDisabled(false)
    }
    const displayShowtime = (showtime) => {
        let hour = showtime.substring(11, 13)
        const minute = showtime.substring(14, 16)
        hour = hour > 12 
            ? hour - 12 + ":" + minute + " PM" 
            : hour + ":" + minute + " AM";
        return hour;
    }

    const hours = Math.floor((movieInfo.runtime)/60);
    const minutes = movieInfo.runtime % 60;

    return (
        <>
        <Grid>
            <Box sx={mainContainer}>
                <Box sx={mainShowTimeContainer}>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>View Showtimes</Typography>
                <Grid sx={{textAlign:'left', marginLeft: 2, marginBottom: 1}}>
                    <Typography variant="h6" style={{ fontFamily: "Lucida Sans" }}>{movieInfo.title}</Typography>
                    <Typography variant="h8" style={{ fontFamily: "Lucida Sans" }}>{movieInfo.releaseDate.split('-')[0]}</Typography>
                    <Typography variant="h8" style={{ fontFamily: "Lucida Sans" }}> • {movieInfo.rating}</Typography>
                    <Typography variant="h8" style={{ fontFamily: "Lucida Sans" }}> • {hours}h {minutes}mins </Typography>
                </Grid>                
                <Box
                    component='img'
                    sx={{
                        width:'100%',
                        height:'auto',
                        maxHeight: 350,
                        maxWidth: 250,
                    }}
                    src={movieInfo.poster}
                    alt='Movie Poster'
                >
                </Box>
                <Box sx={bookingDetailsContainer}>
                    <Typography variant="h6" sx={headerStyle}>Selected Date:</Typography>
                    <Box component="span" sx={spanStyle}>{showDate.substring(0,10)}</Box>
                    <Typography variant="h6" sx={headerStyle}>Selected Location:</Typography>
                    <Box component="span" sx={spanStyle}>{cinema.name}</Box>
                    <Typography variant="h6" sx={headerStyle}>Cinema Address:</Typography>
                    <Box component="span" sx={spanStyle}>{cinema.address}</Box>
                    <Typography variant="h6" sx={headerStyle}>Select Showtime:</Typography>   
                </Box>
                <Box sx={showtimeItemContainer}>
                    { 
                    showtimes.map(showtime => (
                    <ListItem onClick={() => handleShowtimeClick(showtime)}
                    sx={showTimeItem}
                    key={showtime.id} selected={selectedShowtime === showtime.id}>
                        <ListItemText
                            primary={`${displayShowtime(showtime.startTime)}, Hall ${showtime.hall.hallNumber}`}
                        />
                        {selectedShowtime === showtime.id && (
                            <IconButton color="primary">
                                <CircleIcon style={{ color: '#f2b000', fontSize: '16px' }} />
                            </IconButton>
                        )}
                    </ListItem>
                    ))
                    }
                </Box>
            </Box>
            <Stack direction='row' spacing={2} sx={btnContainerStyle}>
                <Button onClick={handleGoBack} className="back-btn" sx={backBtnStyle}>Go Back</Button>
                <Button onClick={handleSeatSelection} className="select-seat" disabled={isDisabled} sx={selectSeatStyle}>Select Seats</Button>
            </Stack>
            </Box>
            
        </Grid>
            
        </>
    )
}

export default Showtimes;