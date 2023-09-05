import { Button, Box, Typography, Stack } from '@mui/material';
import ChosenMovieCard from './ChosenMovieCard';
import SeatsGroup from './SeatsGroup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const boxStyle={
    marginTop: 5,
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent:"center",
    width:{
        xs: 1,
        md: 500,
    },
    margin: '0 auto',
    marginBottom: 10,
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

const backButtonStyle = {
    backgroundColor: '#666',
    color: '#fafafa',
    '&:hover':{
        backgroundColor: '#F2B000',
        textDecoration: 'underline',
        fontWeight: 'bold'
    },
}

const bookDisabledButtonStyle = {
    backgroundColor: '#eee',
    color: '#fafafa'
}

const bookButtonStyle = {
    backgroundColor: '#00A4BD',
    color: '#fafafa',
    '&:hover':{
        backgroundColor: '#F2B000',
        textDecoration: 'underline',
        fontWeight: 'bold'
    },
}

const SeatSelection = () => {
    const userInfo = {movie: {
            id: 1,
            title: 'Meg 2: The Trench',
            release: '2023',
            rating: 'PG-13',
            runtime: 116,
            poster: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg',
        },
        date: '20202020',
        location: 'Ayala Malls Cloverleaf',
        showtime: '11:00 AM, Hall1',
        address: 'A. Bonifacio Avenue, Barangay Balingasa'
    }
    const ticketPrice = 350;
    const maxAmount = 4;

    const navigate = useNavigate();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [isMaxedOut, setMaxedOut] = useState(false);
    const [isDisabled, setDisabled] = useState(true);
    const [totalAmount, setTotalAmount] = useState(0.00);
    const [buttonStyle, setButtonStyle] = useState(bookDisabledButtonStyle)

    const onChangeSeatState = (newSeat) => {
        let selectedLength = selectedSeats.length;
        if(selectedSeats.findIndex(seat => seat === newSeat) === -1){
            setSelectedSeats([...selectedSeats, newSeat].sort((a,b) => a-b))
            setDisabled(false);
            setButtonStyle(bookButtonStyle);
            selectedLength++;
            if(selectedLength === maxAmount) setMaxedOut(true);
        }else{
            setSelectedSeats([...selectedSeats.filter(seats => seats !== newSeat)])
            setMaxedOut(false);
            selectedLength--;
            if(selectedLength=== 0){
                setDisabled(true);
                setButtonStyle(bookDisabledButtonStyle);
            }
        }
        setTotalAmount(selectedLength*ticketPrice)
    }

    return(
        <Box sx={boxStyle}>
            <Typography variant="h4" style={{fontWeight: 'bold'}}>Seat Selection</Typography>
            <ChosenMovieCard movie={userInfo.movie}/>
            <Typography variant="h6" sx={headerStyle}>Selected Date:</Typography>
            <Box component="span" sx={spanStyle}>{userInfo.date}</Box>
            <Typography variant="h6" sx={headerStyle}>Selected Location:</Typography>
            <Box component="span" sx={spanStyle}>{userInfo.location}</Box>
            <Typography variant="h6" sx={headerStyle}>Cinema Address:</Typography>
            <Box component="span" sx={spanStyle}>{userInfo.address}</Box>
            <Typography variant="h6" sx={headerStyle}>Selected Showtime:</Typography>
            <Box component="span" sx={spanStyle}>{userInfo.showtime}</Box>
            <SeatsGroup onChangeSeatState={onChangeSeatState} isMaxedOut={isMaxedOut}/>
            <Typography variant="h6" sx={headerStyle}>Selected Seats:</Typography>
            <Box component="span" sx={spanStyle}>{selectedSeats.length === 0? <Box>None</Box> : <Box>{selectedSeats.join(', ')}</Box>}</Box>
            <Typography variant="h6" sx={headerStyle}>Total Amount:</Typography>
            <Box component="span" sx={spanStyle}>Php {totalAmount.toFixed(2)}</Box>
            <Stack direction='row' spacing={2}>
                <Button sx={backButtonStyle} onClick={() => navigate(-1)}>Go Back</Button>
                <Button sx={buttonStyle} disabled={isDisabled}>Book Ticket</Button>
            </Stack>
        </Box>
    )
}

export default SeatSelection;