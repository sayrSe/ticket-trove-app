import { Button } from '@mui/material';
import OtpConfirmation from './OtpConfirmation';
import SeniorCitizen from './SeniorCitizen';

const Confirmation = () => {
    return(
        <>
            <OtpConfirmation />
            <SeniorCitizen/>
            <Button>Confirm Booking</Button>
        </>
    )
}

export default Confirmation;