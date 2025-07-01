import { Card, CardContent, CardMedia, Typography, Chip, Stack } from '@mui/material';
import { Star } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MovieCard = ({ movie, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      onClick={onClick}
      style={{ cursor: 'pointer', height: '100%' }}
    >
      <Card sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          height="200"
          image={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
          alt={movie.Title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {movie.Title}
          </Typography>
          <Stack direction="row" spacing={1}>
            {movie.Year && <Chip label={movie.Year} size="small" />}
            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
              <Chip icon={<Star sx={{ color: 'gold' }} />} label={movie.imdbRating} size="small" />
            )}
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MovieCard;