import { Typography, Box, Button } from "@mui/material"
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
    textAlign: "left"
}
const boxContainerStyle = {
    marginTop: 5,
    display: "flex",
    justifyContent: "center",
    flexDirection: 'column',
    alignItems: "center"
}

const MovieDetails = () => {
    const { id } = useParams();
    const movieItems = useSelector((state) => state.movie.movieList);
    const movieInfo = movieItems.find((movieItem) => movieItem.id === id);

    return (
        <>
            <Box sx={boxContainerStyle}>
                <Box sx={boxStyle}>
                    <Typography variant="h4" style={{ fontFamily: "Lucida Sans" }}>{movieInfo.title}</Typography>
                    <Typography variant="h7" style={{ fontFamily: "Lucida Sans" }}>{movieInfo.rating}</Typography>
                    <Typography variant="h8" style={{ fontFamily: "Lucida Sans" }}> ● Runtime: {movieInfo.runtime} minutes</Typography>
                    <Box
                        component="img"
                        sx={{
                            width: 350,
                        }}
                        src={movieInfo.poster}
                    />

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
                  
                </Box>
                <Button variant="contained" component={NavLink} to={`/showtimes/${id}`} sx={buttonStyle} >View Locations</Button>
            </Box>

        </>

    )
}

export default MovieDetails;