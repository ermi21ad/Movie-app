// src/components/MovieCard.jsx
import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Star, PlayCircle } from '@mui/icons-material';

const MovieCard = ({ movie }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card sx={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 32px rgba(229, 9, 20, 0.5)',
        }
      }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="300"
            image={movie.Poster}
            alt={movie.Title}
            sx={{ objectFit: 'cover' }}
          />
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%)',
            display: 'flex',
            alignItems: 'flex-end',
            p: 2,
          }}>
            <Chip 
              icon={<Star />} 
              label={movie.imdbRating} 
              color="primary"
              sx={{ 
                backdropFilter: 'blur(5px)',
                background: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
              }}
            />
          </Box>
        </Box>
        
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>{movie.Title}</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip label={movie.Year} size="small" />
            <Chip label={movie.Type} size="small" />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
export default MovieCard;
