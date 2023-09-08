import { Box, Button, Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { useMovies } from "../hooks/useMovies"
import ChosenMovieCard from "./ChosenMovieCard"

const buttonStyle = {
    marginTop:2,
    backgroundColor: '#00A4BD',
    color: '#FAFAFA',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#F2B000',
        textDecoration: 'underline',
        fontWeight: 'bold'
    }
}
const boxStyle={
    marginTop: 5,
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent:"center",
    width:{
        xs: 1,
        md: 600,
        lg: 800
    },
    margin: '0 auto',
    marginBottom: 10,
}

const headerStyle={
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontWeight: 'bold'
}

const spanStyle = {
    alignSelf: 'flex-start',
    marginBottom: 1.5
}


const MovieDetails = () => {
    const { id } = useParams();

    const { findMovie } = useMovies();
    useEffect(() => {findMovie(id)}, [id]);
    
    const movieInfo = useSelector((state) => state.movie.movieDetails);
    const hours = Math.floor((movieInfo.runtime)/60);
    const minutes = (movieInfo.runtime) % 60;

    const navigate = useNavigate();
    const handleViewLocations = () => {
        if(movieInfo) {
            navigate('/cinemas', { 
                state: {   
                    movieInfo: movieInfo,
                    movieId: id 
                } 
            });
        }
    };
    
    return (
        <Box sx={boxStyle}>
            <ChosenMovieCard movie={movieInfo}/>
            <Grid sx={{textAlign:"left" , marginLeft: 2}}>
                <Box sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                    <Typography variant="h6" sx={headerStyle}>
                        Directed by:
                    </Typography>
                </Box>
                <Box component="span" sx={spanStyle}>{movieInfo.director}</Box>
                <Box sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                    <Typography variant="h6" sx={headerStyle}>
                        Synopsis
                    </Typography>
                </Box>
                <Box component="span" sx={spanStyle}>{movieInfo.synopsis}</Box>
                <Box sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                    <Typography variant="h6" sx={headerStyle}>
                        Cast
                    </Typography>
                </Box>
                <Box component="span" sx={spanStyle}>{movieInfo.actors}</Box>
                </Grid>
            <Button variant="contained"  sx={buttonStyle} onClick={handleViewLocations}>View Locations</Button>
        </Box>
    )
}
export default MovieDetails;