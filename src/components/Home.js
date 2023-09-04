import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { useMovies } from '../hooks/useMovies';
import { useEffect } from 'react';
import MovieGroup from './MovieGroup.js';

const Home = () => {
    const { loadMovies } = useMovies();
    useEffect(() => {loadMovies()}, []);

    return (
      <Box className="Home">
        <Typography variant="h4" component="h4" sx={{fontWeight: 'bold'}}>NOW SHOWING</Typography>
        <MovieGroup />
      </Box>
    );
}
  
export default Home;