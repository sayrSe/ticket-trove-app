import { Grid, Box } from '@mui/material'
import SeatButton from './SeatButton'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const boxStyle={
    width: {
        xs: 0.95,
        md: 600,
        lg: 800
    },
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
}

const rowStyle={
    width: 0.05,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
}

const containerStyle = {
    width: 0.9,
    display: 'flex',
}

const itemStyle = {
    border: 'none',
}

const screenStyle = {
    backgroundColor: '#666',
    width: {
        xs: 0.9,
        md: 1
    },
    margin: '0 auto',
    marginBottom: 1,
    color: "#fafafa"
}

const SeatsGroup = (props) => {
    const rows = props.seatLayout?.maxRow;
    const columns = props.seatLayout?.maxCol;
    const cinemaHallSeat = props.seatLayout?.seats;

    return(
        <TransformWrapper>
            <TransformComponent>
                <Box sx={screenStyle}>Screen</Box>
                <Grid container sx={boxStyle}>
                    <Grid container sx={rowStyle} spacing={0}>
                        {[...Array(rows)]?.map((row_number, index) => 
                            <Grid item key={index} xs={12/rows} sx={{fontWeight: 'bold'}}>{props.rowDictionary[index]}</Grid>)}
                    </Grid>
                    <Grid container sx={containerStyle}>
                        {cinemaHallSeat?.map(seat =>
                            <Grid item key={seat.id} xs={12/columns} sx={itemStyle}><SeatButton key={seat.id} seat={seat} onChangeSeatState={props.onChangeSeatState} isMaxedOut={props.isMaxedOut} onMaxedClick={props.onMaxedClick}/></Grid>
                        )}
                    </Grid>
                </Grid>
            </TransformComponent>
        </TransformWrapper>
    )
}

export default SeatsGroup;