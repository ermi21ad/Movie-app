// src/components/Hero.jsx
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <Box sx={{
      height: '70vh',
      background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/hero-bg.jpg)',
      backgroundSize: 'cover',
      display: 'flex',
      alignItems: 'center',
      px: 4,
      position: 'relative',
      overflow: 'hidden',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100px',
        background: 'linear-gradient(to bottom, transparent, #0f0f0f)',
      }
    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h1" sx={{ mb: 2 }}>
          Unlimited Movies
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Discover your next favorite film
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            background: 'linear-gradient(45deg, #E50914 30%, #ff1744 90%)',
            boxShadow: '0 0 20px rgba(229, 9, 20, 0.5)',
          }}
        >
          Explore Now
        </Button>
      </motion.div>
    </Box>
  );
};