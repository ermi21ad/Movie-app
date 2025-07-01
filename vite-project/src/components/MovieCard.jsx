// src/components/MovieCard.jsx
import { Card, CardContent, CardMedia, Typography, Chip, Stack, Box } from '@mui/material';
import { Star, PlayCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MovieCard = ({ movie }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <Card sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(30, 30, 30, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 32px 0 rgba(0, 180, 216, 0.3)',
        }
      }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/500x750?text=No+Poster'}
            alt={movie.Title}
            sx={{ objectFit: 'cover' }}
          />
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.5)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 1,
            }
          }}>
            <PlayCircle sx={{ fontSize: 60, color: 'white' }} />
          </Box>
        </Box>
        
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600 }}>
            {movie.Title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {movie.Year} • {movie.Type}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
              <Chip 
                icon={<Star sx={{ color: 'gold' }} />} 
                label={movie.imdbRating} 
                size="small" 
                sx={{ background: 'rgba(255, 215, 0, 0.1)' }}
              />
            )}
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MovieCard;