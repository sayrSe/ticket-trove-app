import { Grid, Box } from '@mui/material'
import SeatButton from './SeatButton'

const cinemaHallSeat = [
    {
        id: 1,
        row: 1,
        column: 1,
        isAvailable: false,
        isChosen: false,
    },
    {
        id: 2,
        row: 1,
        column: 5,
        isAvailable: false,
        isChosen: false
    },
    {
        id: 3,
        row: 1,
        column: 2,
        isAvailable: false,
        isChosen: false
    },
    {
        id: 4,
        row: 1,
        column: 3,
        isAvailable: false,
        isChosen: false
    },
    {
        id: 5,
        row: 1,
        column: 4,
        isAvailable: false,
        isChosen: false
    },
    {
        id: 6,
        row: 2,
        column: 1,
        isAvailable: true,
        isChosen: false
    },
    {
        id: 7,
        row: 2,
        column: 2,
        isAvailable: true,
        isChosen: false
    },
    {
        id: 8,
        row: 2,
        column: 3,
        isAvailable: true,
        isChosen: false
    },
    {
        id: 9,
        row: 2,
        column: 4,
        isAvailable: true,
        isChosen: false
    },
    {
        id: 10,
        row: 2,
        column: 5,
        isAvailable: true,
        isChosen: false
    },
    {
        id: 11,
        row: 3,
        column: 1,
        isAvailable: true,
        isChosen: false
    },
    {
        id: 12,
        row: 3,
        column: 2,
        isAvailable: true,
        isChosen: false
    },
    {
        id: 13,
        row: 3,
        column: 3,
        isAvailable: true,
        isChosen: false
    },
    {
        id: 14,
        row: 3,
        column: 4,
        isAvailable: true,
        isChosen: false
    },
    {
        id: 15,
        row: 3,
        column: 5,
        status: "RESERVED"
    },
    {
        id: 16,
        row: 4,
        column: 1,
        isAvailable: true,
        isChosen: false
    },
    {
        id: 17,
        row: 4,
        column: 2,
        isAvailable: true,
        isChosen: false
    },
    {
        id: 18,
        row: 4,
        column: 3,
        isAvailable: true,
        isChosen: false
    }
]

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
    marginBottom: 1
}

const SeatsGroup = (props) => {
    const rows = 4;
    const columns = 5;
    const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']

    return(
        <>
            <Box sx={screenStyle}>Screen</Box>
            <Grid container sx={boxStyle}>
                <Grid container sx={rowStyle}>
                    {[...Array(rows)].map((row_number, index) => 
                        <Grid item key={index} xs={12/columns} sx={{fontWeight: 'bold', marginTop: 2}}>{alphabet[index]}</Grid>)}
                </Grid>
                <Grid container sx={containerStyle}>
                    {cinemaHallSeat.map(seat =>
                        <Grid item key={seat.id} xs={12/columns} sx={itemStyle}><SeatButton key={seat.id} seat={seat} onChangeSeatState={props.onChangeSeatState} isMaxedOut={props.isMaxedOut}/></Grid>
                    )}
                </Grid>
            </Grid>
        </>
    )
}

export default SeatsGroup;