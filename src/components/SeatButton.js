import EventSeatIcon from '@mui/icons-material/EventSeat';
import { IconButton } from '@mui/material'
import { useState } from 'react'

const iconStyleReserved = {
    color: 'red',
    width: 1,
    height: 'auto'
}

const iconStyleAvailable = {
    color: '#aaaaaa',
    width: 1,
    height: 'auto',
    '&:hover': {
        color: '#F2B000'
    }
}

const iconStyleChosen = {
    color: '#00A4BD',
    width: 1,
    height: 'auto',
    '&:hover': {
        color: '#2D1C07'
    }
}

const SeatButton = (props) => {
    const [iconStyle, setIconStyle] = useState(props.seat.reserved ? iconStyleReserved : iconStyleAvailable);
    const [isSelected, setSelected] = useState(false);
    
    const onSeatClick = () => {
        if(isSelected)
            setIconStyle(iconStyleAvailable);
        else{
            if(props.isMaxedOut){ 
                props.onMaxedClick();
                return;
            }
            setIconStyle(iconStyleChosen);
        }
        props.onChangeSeatState(props.seat);
        setSelected(!isSelected);
    }

    return(
        <IconButton onClick={onSeatClick} sx={{padding: 0}} disabled={props.seat.reserved || !props.seat.available}>{props.seat.available && <EventSeatIcon sx={iconStyle}/>}</IconButton>
    )    
}

export default SeatButton;