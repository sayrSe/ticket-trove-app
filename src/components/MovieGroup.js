import { useSelector } from "react-redux";
import { Grid } from '@mui/material';
import MovieCard from "./MovieCard";

const gridContainerStyle = {
    display: 'flex',
    justifyContent: {
        xs: 'center',
        md: 'space-around'
    },
    width: 1,
}

const gridItemStyle = {
    overflow: "hidden",
    width: {
        xs: 0.9,
        md: 350,
    },
    height: {
        xs: 0.9,
        md: 500,
    },
    marginBottom: {
        xs: 20,
        md: 10,
    },
    boxShadow: {
        xs: 0,
        md: "2px 3px 5px black"
    }
}

const MovieGroup = () => {
    const movieList = useSelector((state) => state.movie.movieList);
    return (
        <Grid container sx={gridContainerStyle}>
            { movieList.map(movieItem => 
                <Grid item sx={gridItemStyle} key={movieItem.id}>
                    <MovieCard key={movieItem.id} movie={movieItem}/>
                </Grid>) }
        </Grid>
    )
}

export default MovieGroup;