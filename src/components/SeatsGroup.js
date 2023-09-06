import { Grid, Box } from '@mui/material'
import SeatButton from './SeatButton'

const boxStyle={
    width: {
        xs: 0.95,
        sm: 600
    },
    marginLeft: {
        xs: 0,
        sm: 5
    },
    display: 'flex',
    flexDirection: 'row',
}

const rowStyle={
    width: 0.05,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 5,
}

const containerStyle = {
    width: {
        xs: 0.9,
        sm: 500
    },
    display: 'flex',
    justifyContent: 'center',
}

const itemStyle = {
    border: '1px solid #000'
}

const screenStyle = {
    backgroundColor: '#666',
    width: {
        xs: 0.9,
        md: 1
    },
    marginBottom: 1,
    color: "#fafafa"
}

const SeatsGroup = (props) => {
    const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
    const rows = props.seatLayout?.maxRow;
    const columns = Math.ceil(props.seatLayout?.seats.length / rows);
    const cinemaHallSeat = props.seatLayout?.seats;

    return(
        <>
            <Box sx={screenStyle}>Screen</Box>
            <Grid container sx={boxStyle}>
                <Grid container sx={rowStyle}>
                    {[...Array(rows)]?.map((row_number, index) => 
                        <Grid item key={index} xs={12/columns} sx={{fontWeight: 'bold', flex: 1}}>{alphabet[index]}</Grid>)}
                </Grid>
                <Grid container sx={containerStyle}>
                    {cinemaHallSeat?.map(seat =>
                        <Grid item key={seat.id} xs={12/columns} sx={itemStyle}><SeatButton key={seat.id} seat={seat} onChangeSeatState={props.onChangeSeatState} isMaxedOut={props.isMaxedOut} onMaxedClick={props.onMaxedClick}/></Grid>
                    )}
                </Grid>
            </Grid>
        </>
    )
}

export default SeatsGroup;