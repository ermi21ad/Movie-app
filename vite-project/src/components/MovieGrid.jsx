import { Grid, Typography } from '@mui/material';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, onMovieClick }) => {
  if (!movies || movies.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" align="center">
        No movies found. Try a different search.
      </Typography>
    );
  }

  return (
    <Grid container spacing={4}>
      {movies.map((movie) => (
        <Grid item key={movie.imdbID} xs={12} sm={6} md={4} lg={3}>
          <div 
            onClick={() => onMovieClick(movie.imdbID)}
            style={{ cursor: 'pointer', height: '100%' }}
          >
            <MovieCard movie={movie} />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;