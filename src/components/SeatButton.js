import EventSeatIcon from '@mui/icons-material/EventSeat';
import {Button} from '@mui/material'
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
    const [iconStyle, setIconStyle] = useState(props.seat.isAvailable ? iconStyleAvailable : iconStyleReserved);
    const [isSelected, setSelected] = useState(false);
    
    const onSeatClick = () => {
        if(isSelected)
            setIconStyle(iconStyleAvailable);
        else{
            if(props.isMaxedOut){ 
                alert('You have reached the maximum tickets per transaction!!!')
                return;
            }
            setIconStyle(iconStyleChosen);
        }
        props.onChangeSeatState(props.seat.id);
        setSelected(!isSelected);
    }

    return(
        <Button onClick={onSeatClick} disabled={!props.seat.isAvailable}><EventSeatIcon sx={iconStyle}/></Button>
    )    
}

export default SeatButton;