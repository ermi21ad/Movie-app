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
          <MovieCard 
            movie={movie}
            onClick={() => {
              console.log('Movie clicked:', movie.imdbID); // Debug log
              onMovieClick(movie.imdbID);
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;