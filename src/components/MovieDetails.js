import { Typography, Box, Button, Grid } from "@mui/material"
import { alignProperty } from "@mui/material/styles/cssUtils"
import { useSelector } from "react-redux"
import { useParams, NavLink } from "react-router-dom"

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
    const movieItems = useSelector((state) => state.movie.movieList);
    const movieInfo = movieItems.find((movieItem) => movieItem.id === id);
    const hours = Math.floor((movieInfo.runtime)/60);
    const minutes = (movieInfo.runtime) % 60;
    const movieRelease= (movieInfo.release).toString();
    const releaseYear = movieRelease.substring(0,movieRelease.indexOf('-'));
    
    return (
        <>
        <Grid>
            <Box sx={boxContainerStyle}>
                <Box sx={boxStyle}>
                    <Grid sx={{textAlign:"left", marginLeft: 2}}>
                    <Typography variant="h4" style={{ fontFamily: "Lucida Sans" }}>{movieInfo.title}</Typography>
                    <Typography variant="h8" style={{ fontFamily: "Lucida Sans" }}>{movieInfo.release}</Typography>
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
                            Synopsis:
                        </Typography>
                    </Box>
                    <Typography >{movieInfo.synopsis}</Typography>
                    <Box sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                        <Typography variant="h5" style={{ fontFamily: "Lucida Sans" }}>
                            Cast:
                        </Typography>
                    </Box>
                    <Typography >{movieInfo.cast}</Typography>
                  </Grid>
                </Box>
                <Button variant="contained" component={NavLink} to={`/showtimes/${id}`} sx={buttonStyle} >View Locations</Button>
            </Box>
            </Grid>

        </>

    )
}

export default MovieDetails;