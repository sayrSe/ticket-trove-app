import { Button, Typography } from '@mui/material';
import OtpConfirmation from './OtpConfirmation';
import SeniorCitizen from './SeniorCitizen';
import { useState, useEffect } from 'react';
import * as otpApi from "../../src/api/otpApi";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import DetailsGroup from './DetailsGroup';
import { useLocation } from 'react-router-dom';
import { useSeats } from './../hooks/useSeats';
import { useMovies } from '../hooks/useMovies';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Stack } from '@mui/material';
import * as showtimeApi from "../../src/api/showtimeApi";
import * as cinemaApi from "../../src/api/cinemaApi";
import { NavLink } from 'react-router-dom'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

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

const confirmButtonStyle={
    backgroundColor: '#00A4BD',
    color: '#FAFAFA',
    textTransform: 'none',
    '&:hover':{
        backgroundColor: '#F2B000',
        textDecoration: 'underline',
        fontWeight: 'bold'
    },
}

const homeButtonStyle={
    backgroundColor: '#00A4BD',
    color: '#FAFAFA',
    textTransform: 'none',
    '&:hover':{
        backgroundColor: '#F2B000',
        textDecoration: 'underline',
        fontWeight: 'bold'
    },
    margin: '0 auto'
}

const backButtonStyle = {
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

const themedButtonStyle = {
    backgroundColor: '#00A4BD',
    width: '194px',
    height: '55px',
    fontSize: '19px',
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

const Confirmation = () => {
    const [code, setCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    const [disabledButton, setDisabledButton] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const { loadSeats } = useSeats();
    const { findMovie } = useMovies();
    const navigate = useNavigate();

    const { search } = useLocation();
    const parameters = new URLSearchParams(search);
    const showtimeId = parameters.get('showtime_id');
    const seats = parameters.get('seats');
    const selectedSeats = seats?.split('_');
    const [movieId, setMovieId] = useState('');
    const [showtime, setShowtime] = useState('');
    const [cinemaId, setCinemaId] = useState('');
    const [cinema, setCinema] = useState();
    const movieInfo = useSelector((state) => state.movie?.movieDetails);

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
        if(code.length > 0){
            setDisabledButton(false);
        }else{
            setDisabledButton(true);
        }
    }, [code]);

    
    const updateCode = (value) =>{
        setCode(value);
    }
    
    const updatePhone = (value) =>{
        setPhoneNumber(value);
    }

    const handleVerificationClick = () => {
        verifyCode(phoneNumber, code);
    }

    const handleOpen = () =>{
        setIsOpen(true);
    }
    
    const handleClose = () =>{
        setIsOpen(false);
    }
    
    const verifyCode = async (phoneNumber, code) => {
            const response = await otpApi.verifyCode(phoneNumber, code);
            if(!response.data.matched){
                handleOpen();
            }else{
                createBooking();
            }
    }

    const createBooking = () => {
        setOpenSuccess(true);
    }

    return(
        <Box sx={boxStyle}>
            <BootstrapDialog onClose={handleClose} aria-labelledby="maxed-out-seats" open={isOpen}>
                <DialogTitle sx={{ m: 0, p: 2 }} id="wrong-code">Wrong OTP Code!</DialogTitle>
                <DialogContent dividers>
                <Typography gutterBottom>You entered a wrong OTP code. Please double check your SMS.</Typography>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleClose} sx={confirmButtonStyle}>
                    Okay
                </Button>
                </DialogActions>
            </BootstrapDialog>

            <BootstrapDialog onClose={handleClose} aria-labelledby="maxed-out-seats" open={openSuccess}>
                <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#00A4BD', color: "#fafafa"}} id="successful">Congrats, you've successfully booked tickets!</DialogTitle>
                <DialogContent dividers>
                <Typography gutterBottom>Please arrive at your chosen cinema location 20 minutes before your selected showtime to settle your payment.</Typography>
                <Typography gutterBottom>The booking information will also be sent on your phone number via SMS.</Typography>
                </DialogContent>
                <DialogActions>
                <Button autoFocus component={NavLink} to={'/'} sx={homeButtonStyle}>
                    Go Home
                </Button>
                </DialogActions>
            </BootstrapDialog>

            <DetailsGroup movie={movieInfo} showtime={showtime} cinema={cinema} selectedSeats={selectedSeats}/>
            <OtpConfirmation updateCode={updateCode} updatePhone={updatePhone}/>
            <SeniorCitizen/>
            <Stack direction='row' spacing={2}>
                <Button sx={backButtonStyle} onClick={() => navigate(-1)}>Go Back</Button>
                <Button sx={themedButtonStyle} disabled={disabledButton} onClick={handleVerificationClick}>Confirm Booking</Button>
            </Stack>
        </Box>
    )
}

export default Confirmation;