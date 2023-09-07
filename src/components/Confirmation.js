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
import * as showtimeApi from "../../src/api/showtimeApi";
import { useLocation } from 'react-router-dom';
import * as cinemaApi from "../../src/api/cinemaApi";
import { useSeats } from './../hooks/useSeats';
import { useMovies } from '../hooks/useMovies';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Stack } from '@mui/material';

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

const backButtonStyle = {
    backgroundColor: '#666',
    color: '#fafafa',
    '&:hover':{
        backgroundColor: '#F2B000',
        textDecoration: 'underline',
        fontWeight: 'bold'
    },
}

const disabledButtonStyle={
    backgroundColor: '#aaaaaa',
    WebkitTextFillColor: "#fafafa",
}

const Confirmation = () => {
    const [code, setCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    const [disabledButton, setDisabledButton] = useState(true);
    const [confirmStyle, setConfirmStyle] = useState(disabledButtonStyle);
    const [isOpen, setIsOpen] = useState(false);

    const { loadSeats } = useSeats();
    const { findMovie } = useMovies();
    const navigate = useNavigate();

    const { search } = useLocation();
    const parameters = new URLSearchParams(search);
    const showtimeId = parameters.get('showtime_id');
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
            setConfirmStyle(confirmButtonStyle);
        }else{
            setDisabledButton(true);
            setConfirmStyle(disabledButtonStyle);
        }
    }, [code]);

    const verifyCode = async (phoneNumber, code) => {
            const response = await otpApi.verifyCode(phoneNumber, code);
            if(!response.data.matched){
                handleOpen();
            }else{
                alert('CORRECT');
            }
    }

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

            <DetailsGroup movie={movieInfo} showtime={showtime} cinema={cinema}/>
            <OtpConfirmation updateCode={updateCode} updatePhone={updatePhone}/>
            <SeniorCitizen/>
            <Stack direction='row' spacing={2}>
                <Button sx={backButtonStyle} onClick={() => navigate(-1)}>Go Back</Button>
                <Button sx={confirmStyle} disabled={disabledButton} onClick={handleVerificationClick}>Confirm Booking</Button>
            </Stack>
        </Box>
    )
}

export default Confirmation;