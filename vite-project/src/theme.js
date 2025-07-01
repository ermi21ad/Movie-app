// src/theme.js
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00b4d8', // Teal accent color
    },
    secondary: {
      main: '#ff9e00', // Orange accent color
    },
    background: {
      default: '#0a0a0a', // Dark background
      paper: '#1a1a1a',   // Slightly lighter for cards
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '0.5px',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default darkTheme;