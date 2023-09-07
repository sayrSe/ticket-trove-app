import MovieCard from "./MovieCard";
import { Typography, Box } from '@mui/material';

const headerStyle={
    marginLeft: 2,
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontWeight: 'bold'
}

const spanStyle = {
    marginLeft: 2,
    alignSelf: 'flex-start',
    marginBottom: 1.5
}

const DetailsGroup = (props) => {
    return(
        <>
            <MovieCard movie={props.movie}/>
            <Typography variant="h6" sx={headerStyle}>Selected Date:</Typography>
            <Box component="span" sx={spanStyle}>{new Date(props.showtime?.startTime).toLocaleDateString("en-PH", {year: 'numeric', month: 'long', day: 'numeric'})}</Box>
            
            <Typography variant="h6" sx={headerStyle}>Selected Location:</Typography>
            <Box component="span" sx={spanStyle}>{props.cinema?.name}</Box>
            
            <Typography variant="h6" sx={headerStyle}>Cinema Address:</Typography>
            <Box component="span" sx={spanStyle}>{props.cinema?.address}</Box>
            
            <Typography variant="h6" sx={headerStyle}>Selected Showtime:</Typography>
            <Box component="span" sx={spanStyle}>
                {new Date(props.showtime.startTime).toLocaleTimeString("en-PH", {hour: "2-digit", minute: "2-digit", hour12: "true"})}, Hall {props.showtime.hallId}
            </Box>
                        
            <Typography variant="h6" sx={headerStyle}>Selected Seats:</Typography>
            <Box component="span" sx={spanStyle}>{props.selectedSeats?.join(', ')}</Box>
        </>
    )
}

export default DetailsGroup;