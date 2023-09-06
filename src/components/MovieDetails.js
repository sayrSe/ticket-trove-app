import { Box, Button, Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { useMovies } from "../hooks/useMovies"

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
const boxStyle = {
    width: {
        xs: 1,
        md: 350,
    },
    marginTop: 2,
    alignItems:"center",
    justifyContent:"center"

}
const boxContainerStyle = {
    marginTop: 5,
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    marginBottom:5,
    justifyContent:"center"
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
        navigate('/cinemas', { state: 
            { movieInfo: movieInfo,
                movieId: id 
            } 
        });
    };
    
    return (
        <>
        <Grid>
            <Box sx={boxContainerStyle}>
                <Box sx={boxStyle}>
                    <Grid sx={{textAlign:"left", marginLeft: 2}}>
                    <Typography variant="h4" style={{ fontFamily: "Lucida Sans" }}>{movieInfo.title}</Typography>
                    <Typography variant="h8" style={{ fontFamily: "Lucida Sans" }}>{movieInfo.releaseDate?.split("-")[0]}</Typography>
                    <Typography variant="h8" style={{ fontFamily: "Lucida Sans" }}> ◦ {movieInfo.rating}</Typography>
                    <Typography variant="h8" style={{ fontFamily: "Lucida Sans" }}> ◦ {hours}h {minutes}mins </Typography>
                    </Grid>
                    <Box
                        component="img"
                        sx={{
                            width: "100%",
                            height: "auto",
                            maxHeight: 350,
                            maxWidth: 250,
                        }}
                        src={movieInfo.poster}
                        alt="Movie Poster"
                    />
                    <Grid sx={{textAlign:"left" , marginLeft: 2}}>
                    <Box sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                        <Typography variant="h5" style={{ fontFamily: "Lucida Sans" }}>
                            Directed by:
                        </Typography>
                    </Box>
                    <Typography >{movieInfo.director}</Typography>
                    <Box sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                        <Typography variant="h5" style={{ fontFamily: "Lucida Sans" }}>
                            Synopsis
                        </Typography>
                    </Box>
                    <Typography >{movieInfo.synopsis}</Typography>
                    <Box sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                        <Typography variant="h5" style={{ fontFamily: "Lucida Sans" }}>
                            Cast
                        </Typography>
                    </Box>
                    <Typography >{movieInfo.actors}</Typography>
                  </Grid>
                </Box>
                <Button variant="contained"  sx={buttonStyle} onClick={handleViewLocations}>View Locations</Button>
            </Box>
            </Grid>

        </>

    )
}
export default MovieDetails;