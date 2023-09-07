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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

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
        <>
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

            <OtpConfirmation updateCode={updateCode} updatePhone={updatePhone}/>
            {/* <SeniorCitizen/> */}
            <Button sx={confirmStyle} disabled={disabledButton} onClick={handleVerificationClick}>Confirm Booking</Button>
        </>
    )
}

export default Confirmation;