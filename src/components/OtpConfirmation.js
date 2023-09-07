import { Box, Typography, TextField, Stack, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useOtp } from '../hooks/useOtp';
import useCountdown from './../hooks/useCountdown';

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

const activeSendButtonStyle={
    backgroundColor: '#00A4BD',
    color: '#FAFAFA',
    textTransform: 'none',
    '&:hover':{
        backgroundColor: '#F2B000',
        textDecoration: 'underline',
        fontWeight: 'bold'
    },
    width: {
        xs: 0.25,
        sm: 150
    }
}

const disabledButtonStyle={
    backgroundColor: '#aaaaaa',
    WebkitTextFillColor: "#fafafa",
    textTransform: 'none',
    width: {
        xs: 0.25,
        sm: 150
    }
}

const activeOtpStyle={
    marginLeft: 2,
    width: {
        xs: 0.9,
        sm: 460,
    },
    margin: '0 auto'
}

const disabledOtpStyle={
    marginLeft: 2,
    width: {
        xs: 0.9,
        sm: 460,
    },
    margin: '0 auto',
    backgroundColor: '#eeeeee'
}

const visibleReminderStyle={
    visibility: 'visible'
}

const hiddenReminderStyle={
    visibility: 'hidden'
}

const OtpConfirmation = (props) => {
    const { generateOtp } = useOtp();
    const [buttonText, setButtonText] = useState('Send');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [sendButtonStyle, setSendButtonStyled] = useState(activeSendButtonStyle);
    const [otpInputDisable, setOtpInputDisable] = useState(true);
    const [otpInputStyle, setOtpInputStyle] = useState(disabledOtpStyle);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpNumber, setOtpNumber] = useState('');
    const [reminderStyle, setReminderStyle] = useState(hiddenReminderStyle);
    const { secondsLeft, start} = useCountdown();

    const handleInputNumber = (event) => {
        if(event.target.value.length <= 11 && isValidValue(event.target.value)){
            setPhoneNumber(event.target.value);
            props.updatePhone(event.target.value);
        }
    }

    const handleInputOtp = (event) => {
        if(event.target.value.length <= 6 && isValidValue(event.target.value)){
            setOtpNumber(event.target.value);
            props.updateCode(event.target.value);
        }
    }

    const isValidValue = (value) => {
        return /^\d+$/.test(value) || value === '';
    }

    const handleSendClick = () => {
        if(!isValidPhoneNumber()){
            alert("Input a valid phone number!");
            return;
        }
        generateOtp(phoneNumber);
        setButtonDisabled(true);
        start(180);
        setReminderStyle(visibleReminderStyle);
        setOtpInputDisable(false);
        setOtpInputStyle(activeOtpStyle);
    }

    const isValidPhoneNumber = () => {
        return phoneNumber !== '';
    }

    useEffect(() =>{
        if((secondsLeft === 0) && buttonDisabled){
            setButtonText('Resend');
            setButtonDisabled(false);
        }else if(buttonDisabled)
            setButtonText(`(${secondsLeft})`);
    }, [buttonDisabled, secondsLeft]);

    useEffect(() => {
        if(buttonDisabled)
            setSendButtonStyled(disabledButtonStyle);
        else
            setSendButtonStyled(activeSendButtonStyle);
    }, [buttonDisabled])

    return(
        <Box sx={containerStyle}>
            <Typography variant="h6" sx={headerStyle}>Phone Number:</Typography>
            <Stack direction="row" spacing={1} justifyContent={'center'}>
                <Box sx={phoneInputStyle}>
                    <TextField fullWidth required={true} size={'small'} id="phone-number" variant="outlined" value={phoneNumber} onChange={handleInputNumber}/>
                </Box>
                <Button sx={sendButtonStyle} onClick={handleSendClick} disabled={buttonDisabled}>{buttonText}</Button>
            </Stack>
            <Box component="span" sx={reminderStyle}>Check your SMS. If you did not receive anything, please wait before resending OTP.</Box>
            <Typography variant="h6" sx={headerStyle}>Verification Code:</Typography>
            <Box sx={otpInputStyle}>
                <TextField fullWidth required={true} size={'small'} id="otp-number" variant="outlined" value={otpNumber} onChange={handleInputOtp} disabled={otpInputDisable}/>
            </Box>
        </Box>
    )
}

export default OtpConfirmation;