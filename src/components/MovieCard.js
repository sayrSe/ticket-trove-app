import { Box } from '@mui/system'
import { Typography, Button } from '@mui/material'

const boxStyle={
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 0.95,
}

const titleStyle={
    fontWeight: 'bold', 
    width: '0.8', 
    height: 0.2,
}

const posterStyle={
    marginTop: 1.1,
    width: 0.6,
}

const detailStyle={
    marginLeft: 3,
    alignSelf: 'flex-start',
    fontSize: 16
}

const buttonStyle={
    marginTop: 2,
    marginRight: 3,
    alignSelf: 'flex-end',
    backgroundColor: '#00A4BD',
    color: '#FAFAFA',
    textTransform: 'none',
    '&:hover':{
        backgroundColor: '#F2B000',
        textDecoration: 'underline',
        fontWeight: 'bold'
    }
}

const MovieCard = (props) => {
    return (
        <Box className="MovieCard" sx={boxStyle}>
            <Box sx={posterStyle} component="img" src={props.movie.poster} alt={props.movie.title + " Movie Poster"} />
            <Typography variant="h5" component="h5" sx={titleStyle}>{props.movie.title}</Typography>
            <Box component="span" sx={detailStyle}>{props.movie.short_description}</Box>
            <Box component="span" sx={detailStyle}>Rating: {props.movie.rating}</Box>
            <Button sx={buttonStyle}>See Details</Button>
        </Box>
    )
}

export default MovieCard;