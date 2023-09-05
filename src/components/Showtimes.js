import { ListItemButton, Box, Typography, Stack, Button } from "@mui/material"
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { useMovies } from '../hooks/useMovies'

const btnContainerStyle = {
    display: 'flex',
    justifyContent: 'space-evenly'
}

const backBtnStyle = {
    backgroundColor: '#666',
    width: '150px',
    height: '55px',
    color: '#FAFAFA',
    fontSize: '20px',
    fontWeight: '700',
    margin: 0,
}
const selectSeatStyle = {
    backgroundColor: '#00A4BD',
    width: '194px',
    height: '55px',
    fontSize: '20px',
    fontWeight: '700',
    '&:disabled': {
        backgroundColor: '#B9B9B9',
        color: '#FAFAFA',
    }
}
const showTimeItem = {
    width: "80%",
    '&:selected': {
        backgroundColor: '#00A4BD',
    }
}
const showTimeItemContainer = {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
}
const showTimeContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '90%',
}

const mainShowTimeContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const Showtimes = () => {
    const {id} = useParams();
    const {loadMovies} = useMovies();
    useEffect(() => {loadMovies()}, []);

    const [selectedState, setSelectedState] = useState(false);
    const movieItems = useSelector((state) => state.movie.movieList);
    const showTimes = useSelector((state) => state.showtime.showTimeList);
    const movieInfo = movieItems.find((movieItem) => movieItem.id === id);
    const showTimeInfo = showTimes.find((movieItem) => movieItem.movie_id === id);
    
    const selectItem = (event) => {
        setSelectedState(!selectedState);
    }
    return (
        <>
        <Box sx={mainShowTimeContainer}>
            <Box sx={showTimeContainer}>
                <Box
                    component="img"
                    sx={{
                        width: 350,
                    }}
                    alt="The house from the offer."
                    src={movieInfo.poster}
                />
                <Typography variant="h5" style={{ fontFamily: "Lucida Sans" }}>
                    Selected Date:
                </Typography>
                    <Typography variant="h6" style={{ fontFamily: "Lucida Sans" }}>
                        September 4, 2023
                    </Typography>
                <Typography variant="h5" style={{ fontFamily: "Lucida Sans" }}>
                    Selected Location:
                </Typography>
                    <Typography variant="h6" style={{ fontFamily: "Lucida Sans" }}>
                        Ayala Malls Cloverleaf
                    </Typography>
                <Typography variant="h5" style={{ fontFamily: "Lucida Sans" }}>
                    Cinema Address:
                </Typography>
                <Typography variant="h5" style={{ fontFamily: "Lucida Sans" }}>
                    Selected Showtime:
                </Typography>
            </Box>
            <Box sx={showTimeItemContainer}>
                <ListItemButton onClick={selectItem} selected={selectedState} sx={showTimeItem}>11:00 AM</ListItemButton>
                <ListItemButton sx={showTimeItem}>02:00 PM</ListItemButton>
                <ListItemButton sx={showTimeItem}>05:00 PM</ListItemButton>
            </Box>
        </Box>
            <Stack direction='row' spacing={2} sx={btnContainerStyle}>
                <Button className="back-btn" sx={backBtnStyle}>Go Back</Button>
                <Button className="select-seat" disabled sx={selectSeatStyle}>Select Seats</Button>
            </Stack>
        </>
    )
}

export default Showtimes;