import { Grid, IconButton, ListItemText, ListItem, Box, Typography, Stack, Button } from "@mui/material"
import React, { useState } from 'react'
import ChosenMovieCard from './ChosenMovieCard';
import { useNavigate } from "react-router-dom"
import CircleIcon from '@mui/icons-material/Circle';

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
    const [selectedState, setSelectedState] = useState(false);
    const [selectedShowtime, setSelectedShowtime] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const handleGoBack = () => {
        navigate(-1);
    }
    const handleSeatSelection = () => {
        navigate('/next-step');
    }

    const handleShowtimeClick = (showtime) => {
        setSelectedShowtime(showtime.showtime)
        setSelectedState(!selectedState)
        setIsDisabled(false)
    }
    const displayShowtime = (showtime) => {
        let hour = showtime.substring(10, 13)
        const minute = showtime.substring(14, 16)
        hour = hour > 12 
            ? hour - 12 + ":" + minute + " PM" 
            : hour + ":" + minute + " AM";
        return hour;
    }
    const userInfo = {
        movie: {
            id: 1,
            title: 'Meg 2: The Trench',
            release: '2023',
            rating: 'PG-13',
            runtime: 116,
            poster: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg',
        },
        date: '2023-09-16 00:00:00',
        location: 'Ayala Malls Cloverleaf',
        address: 'A. Bonifacio Avenue, Barangay Balingasa',
        showtimes: 
        [{
            id: 1,
            showtime: '2023-09-18 11:00:00',
            hall: 'Hall 1',
        },
        {
            id: 2,
            showtime:'2023-09-18 13:00:00',
            hall: 'Hall 2',
        },
        {
            id: 3,
            showtime: '2023-09-18 16:00:00',
            hall: 'Hall 3',
        }]
    }
    const hours = Math.floor((userInfo.movie.runtime)/60);
    const minutes = userInfo.movie.runtime % 60;
    
    return (
        <>
        <Grid>
            <Box sx={mainContainer}>
                <Box sx={mainShowTimeContainer}>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>View Showtimes</Typography>
                <Grid sx={{textAlign:'left', marginLeft: 2}}>
                    <Typography variant="h6" style={{ fontFamily: "Lucida Sans" }}>{userInfo.movie.title}</Typography>
                    <Typography variant="h8" style={{ fontFamily: "Lucida Sans" }}>{userInfo.movie.releaseDate?.split("-")[0]}</Typography>
                    <Typography variant="h8" style={{ fontFamily: "Lucida Sans" }}> • {userInfo.movie.rating}</Typography>
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
                    src={userInfo.movie.poster}
                    alt='Movie Poster'
                >
                </Box>
                <Box sx={bookingDetailsContainer}>
                    <Typography variant="h6" sx={headerStyle}>Selected Date:</Typography>
                    <Box component="span" sx={spanStyle}>{userInfo.date.substring(0,10)}</Box>
                    <Typography variant="h6" sx={headerStyle}>Selected Location:</Typography>
                    <Box component="span" sx={spanStyle}>{userInfo.location}</Box>
                    <Typography variant="h6" sx={headerStyle}>Cinema Address:</Typography>
                    <Box component="span" sx={spanStyle}>{userInfo.address}</Box>
                    <Typography variant="h6" sx={headerStyle}>Select Showtime:</Typography>   
                </Box>
                <Box sx={showtimeItemContainer}>
                    { 
                    userInfo.showtimes.map(showtime => (
                    <ListItem onClick={() => handleShowtimeClick(showtime)}
                    sx={showTimeItem}
                    key={showtime.id} selected={selectedShowtime === showtime.showtime}>
                        <ListItemText
                            primary={`${displayShowtime(showtime.showtime)}, ${showtime.hall}`}
                        />
                        {selectedShowtime === showtime.showtime && (
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