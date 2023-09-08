import { Box, Typography } from '@mui/material';

const boxStyle={
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
    width: {
        xs: 1,
        md: 500,
    }
}

const textStyle={
    alignSelf: 'start',
    marginLeft: 2,
}

const imageStyle={
    width: "80%",
    height: "auto",
    maxWidth: 400
}

const ChosenMovieCard = (props) => {
    const hours = Math.floor((props.movie.runtime)/60);
    const minutes = (props.movie.runtime) % 60;

    return(
        <Box sx={boxStyle}>
            <Typography variant="h5" sx={textStyle} style={{ fontWeight: "bold" }}>{props.movie.title}</Typography>
            <Typography variant="h8" sx={textStyle}>{props.movie.releaseDate?.split("-")[0]} ◦ {props.movie.rating}  ◦ {hours}h {minutes}mins </Typography>
            <Box
                        component="img"
                        sx={imageStyle}
                        src={props.movie.poster}
                        alt="Movie Poster"
            />
        </Box>
    )
}

export default ChosenMovieCard;