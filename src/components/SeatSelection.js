import { Button, Box, Typography, Stack } from '@mui/material';
import ChosenMovieCard from './ChosenMovieCard';
import SeatsGroup from './SeatsGroup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import { useSeats } from './../hooks/useSeats';
import { useMovies } from '../hooks/useMovies';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as cinemaApi from "../../src/api/cinemaApi";
import * as showtimeApi from "../../src/api/showtimeApi";
import ClipLoader from 'react-spinners/ClipLoader';
import { NavLink } from 'react-router-dom'

const boxStyle={
    marginTop: 5,
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent:"center",
    width:{
        xs: 1,
        md: 600,
        lg: 800
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

const themedButtonStyle = {
    backgroundColor: '#00A4BD',
    color: '#fafafa',
    '&:hover':{
        backgroundColor: '#F2B000',
        textDecoration: 'underline',
        fontWeight: 'bold'
    },
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

const SeatSelection = () => {
    const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

    const { loadSeats } = useSeats();
    const { findMovie } = useMovies();
    const navigate = useNavigate();
    
    const { search } = useLocation();
    const parameters = new URLSearchParams(search);
    const showtimeId = parameters.get('showtime_id');
    const [movieId, setMovieId] = useState('');
    const [showtime, setShowtime] = useState('');
    const [cinemaId, setCinemaId] = useState('');
    
    
    const movieInfo = useSelector((state) => state.movie?.movieDetails);
    const seatLayout = useSelector((state) => state.seat?.hall);
    
    const ticketPrice = 350;
    const maxAmount = 4;
    
    const [cinema, setCinema] = useState();
    const [rowDictionary, setRowDictionary] = useState(alphabet);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedDisplay, setSelectedDisplay] = useState([]);
    const [isMaxedOut, setMaxedOut] = useState(false);
    const [isDisabled, setDisabled] = useState(true);
    const [totalAmount, setTotalAmount] = useState(0.00);
    const [buttonStyle, setButtonStyle] = useState(bookDisabledButtonStyle);
    const [isOpen, setIsOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const handleLoading = () => {
        setIsLoading(false);
    }

    useEffect(()=>{
        window.addEventListener("load",handleLoading);
        return () => window.removeEventListener("load",handleLoading);
    },[])

    useEffect(() => {
        const fetchData = async () => {
            const response = await showtimeApi.getShowtimeById(showtimeId);
            setMovieId(response.data.movieId);
            setShowtime(response.data);
            setCinemaId(response.data.cinemaId);
        }
        fetchData()
    }, []);

    useEffect(() => {
        if(movieId !== '') findMovie(movieId);
    }, [movieId]);
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await cinemaApi.getCinemaById(cinemaId);
            setCinema(response.data);
        }
        if(cinemaId !== '') fetchData()
    }, [cinemaId]);
    
    useEffect(() => {
        loadSeats(showtimeId);
    }, [showtimeId]);

    useEffect(() => {
        if(seatLayout?.maxRow > 26){
            let newRowDictionary = [...rowDictionary];
            let firstLetterIndex = 0;
            let secondLetterIndex = 0;
            for(let index = 0; index < seatLayout.maxRow - 26; index++){
                newRowDictionary.push(alphabet[firstLetterIndex]+alphabet[secondLetterIndex]);
                secondLetterIndex++;
                if(secondLetterIndex === 26){
                    firstLetterIndex++;
                    secondLetterIndex = 0;
                }
            }
            setRowDictionary(newRowDictionary);
        }
    }, [seatLayout]);
    
    const handleChangeSeatState = (newSeat) => {
        let selectedLength = selectedSeats.length;
        let newSelectedSeats = [];
        if(selectedSeats.findIndex(seat => seat.id === newSeat.id) === -1){
            newSelectedSeats = [...selectedSeats, newSeat].sort((a,b) => a.rowNum-b.rowNum || a.seatNum-b.seatNum);
            setSelectedSeats(newSelectedSeats)
            setDisabled(false);
            setButtonStyle(themedButtonStyle);
            selectedLength++;
            if(selectedLength === maxAmount) setMaxedOut(true);
        }else{
            newSelectedSeats = [...selectedSeats.filter(seats => seats !== newSeat)];
            setSelectedSeats(newSelectedSeats)
            setMaxedOut(false);
            selectedLength--;
            if(selectedLength=== 0){
                setDisabled(true);
                setButtonStyle(bookDisabledButtonStyle);
           }
        }
        setTotalAmount(selectedLength*ticketPrice);
        const newDisplay = newSelectedSeats.map(seat => rowDictionary[seat.rowNum - 1] + seat.seatNum);
        setSelectedDisplay(newDisplay);
    }

    const handleOpen = () =>{
        setIsOpen(true);
    }

    const handleClose = () =>{
        setIsOpen(false);
    }

    return  <Box sx={boxStyle}>
    <BootstrapDialog onClose={handleClose} aria-labelledby="maxed-out-seats" open={isOpen}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">Maxed Tickets!</DialogTitle>
        <DialogContent dividers>
        <Typography gutterBottom>You have reached maximum tickets per transaction. Only a maximum of four tickets is allowed.</Typography>
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={handleClose} sx={themedButtonStyle}>
            Okay
        </Button>
        </DialogActions>
    </BootstrapDialog>
    
    <Typography variant="h4" style={{fontWeight: 'bold'}}>Seat Selection</Typography>
    <ChosenMovieCard movie={movieInfo}/>
    
    <Typography variant="h6" sx={headerStyle}>Selected Date:</Typography>
    <Box component="span" sx={spanStyle}>{new Date(showtime.startTime).toLocaleDateString("en-PH", {year: 'numeric', month: 'long', day: 'numeric'})}</Box>
    
    <Typography variant="h6" sx={headerStyle}>Selected Location:</Typography>
    <Box component="span" sx={spanStyle}>{cinema?.name}</Box>
    
    <Typography variant="h6" sx={headerStyle}>Cinema Address:</Typography>
    <Box component="span" sx={spanStyle}>{cinema?.address}</Box>
    
    <Typography variant="h6" sx={headerStyle}>Selected Showtime:</Typography>
    <Box component="span" sx={spanStyle}>
        {new Date(showtime.startTime).toLocaleTimeString("en-PH", {hour: "2-digit", minute: "2-digit", hour12: "true"})}, Hall {showtime.hallId}
    </Box>
    
    <SeatsGroup seatLayout={seatLayout} onChangeSeatState={handleChangeSeatState} isMaxedOut={isMaxedOut} onMaxedClick={handleOpen} rowDictionary={rowDictionary}/>
    
    <Typography variant="h6" sx={headerStyle}>Selected Seats:</Typography>
    <Box component="span" sx={spanStyle}>{selectedSeats.length === 0? <Box>None</Box> : <Box>{selectedDisplay.join(', ')}</Box>}</Box>
    
    <Typography variant="h6" sx={headerStyle}>Total Amount:</Typography>
    <Box component="span" sx={spanStyle}>Php {totalAmount.toFixed(2)}</Box>
    
    <Stack direction='row' spacing={2}>
        <Button sx={backButtonStyle} onClick={() => navigate(-1)}>Go Back</Button>
        <Button sx={buttonStyle} disabled={isDisabled} component={NavLink} to={`/confirmation?showtimeId=${showtimeId}&seats=${selectedDisplay.join('_')}`}>Book Ticket</Button>
    </Stack>
</Box>
} 

export default SeatSelection;