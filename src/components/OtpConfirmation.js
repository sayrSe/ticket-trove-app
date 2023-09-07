import { Box, Typography, TextField, Stack, Button } from '@mui/material';
import { useState } from 'react';
import { useOtp } from '../hooks/useOtp';

const containerStyle={
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    marginBottom: 10
}

const headerStyle={
    marginLeft: 2,
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontWeight: 'bold'
}

const phoneInputStyle={
    marginLeft: 2,
    width: {
        xs: 0.7,
        sm: 350,
    },
}

const sendButtonStyle={
    backgroundColor: '#00A4BD',
    color: '#FAFAFA',
    textTransform: 'none',
    '&:hover':{
        backgroundColor: '#F2B000',
        textDecoration: 'underline',
        fontWeight: 'bold'
    },
    width: {
        xs: 0.2,
        sm: 100,
    }
}

const otpInputStyle={
    marginLeft: 2,
    width: {
        xs: 0.9,
        sm: 460,
    },
    margin: '0 auto'
}

const OtpConfirmation = () => {
    const { generateOtp } = useOtp();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpNumber, setOtpNumber] = useState('');

    const handleInputNumber = (event) => {
        if(event.target.value.length <= 11 && isValid(event.target.value))
            setPhoneNumber(event.target.value);
    }

    const handleInputOtp = (event) => {
        if(event.target.value.length <= 6 && isValid(event.target.value))
            setOtpNumber(event.target.value);
    }

    const isValid = (value) => {
        return /^\d+$/.test(value) || value === '';
    }

    const handleSendClick = () => {
        generateOtp(phoneNumber);
    }

    return(
        <Box sx={containerStyle}>
            <Typography variant="h6" sx={headerStyle}>Phone Number:</Typography>
            <Stack direction="row" spacing={1} justifyContent={'center'}>
                <Box sx={phoneInputStyle}>
                    <TextField fullWidth required={true} size={'small'} id="phone-number" variant="outlined" value={phoneNumber} onChange={handleInputNumber}/>
                </Box>
                <Button sx={sendButtonStyle} onClick={handleSendClick} >Send</Button>
            </Stack>
            <Typography variant="h6" sx={headerStyle}>Verification Code:</Typography>
            <Box sx={otpInputStyle}>
                <TextField fullWidth required={true} size={'small'} id="otp-number" variant="outlined" value={otpNumber} onChange={handleInputOtp}/>
            </Box>
        </Box>
    )
}

export default OtpConfirmation;