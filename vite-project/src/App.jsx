import { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  CssBaseline,
  IconButton,
  Paper,
  CircularProgress,
  Alert,
  Modal
} from '@mui/material';
import { MovieFilter, Brightness4, Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import MovieGrid from './components/MovieGrid';
import SearchBar from './components/SearchBar';
import { searchMovies, getMovieById } from './services/omdb';

const GlassPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(26, 26, 26, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
  borderRadius: theme.shape.borderRadius,
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '900px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto'
};

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('action');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchMovies = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await searchMovies(query);
      if (result.movies) {
        setMovies(result.movies);
      } else {
        setError('No movies found. Try a different search.');
      }
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = async (imdbID) => {
    setSelectedMovieId(imdbID);
    setModalOpen(true);
    try {
      const details = await getMovieById(imdbID);
      setMovieDetails(details);
    } catch (err) {
      setError('Failed to load movie details');
      setModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setMovieDetails(null);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
        color: 'white',
      }}>
        <AppBar position="fixed" sx={{ 
          background: 'rgba(15, 12, 41, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <Toolbar>
            <MovieFilter sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
              CINEMATIC
            </Typography>
            <IconButton color="inherit">
              <Brightness4 />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ pt: 12, pb: 8 }}>
          <Typography variant="h1" sx={{ 
            mb: 4, 
            textAlign: 'center',
            background: 'linear-gradient(to right, #00b4d8, #ff9e00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800
          }}>
            Discover Movies
          </Typography>
          
          <GlassPaper sx={{ p: 4, mb: 6 }}>
            <SearchBar 
              query={query} 
              setQuery={setQuery} 
              onSearch={fetchMovies} 
            />
          </GlassPaper>

          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <CircularProgress size={60} thickness={4} sx={{ color: '#00b4d8' }} />
            </Box>
          ) : (
            <MovieGrid 
              movies={movies} 
              onMovieClick={handleMovieClick}
            />
          )}
        </Container>
      </Box>

      {/* Simple Modal for Movie Details */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="movie-details-modal"
        aria-describedby="movie-details-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
          
          {movieDetails ? (
            <>
              <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
                {movieDetails.Title} ({movieDetails.Year})
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
                {movieDetails.Poster && movieDetails.Poster !== 'N/A' && (
                  <img 
                    src={movieDetails.Poster} 
                    alt={movieDetails.Title} 
                    style={{ 
                      maxWidth: '300px', 
                      width: '100%', 
                      borderRadius: '8px',
                      alignSelf: 'flex-start'
                    }} 
                  />
                )}
                
                <Box>
                  {movieDetails.imdbRating && movieDetails.imdbRating !== 'N/A' && (
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      ⭐ {movieDetails.imdbRating}/10
                    </Typography>
                  )}
                  
                  {movieDetails.Plot && (
                    <Typography paragraph sx={{ mb: 2 }}>
                      {movieDetails.Plot}
                    </Typography>
                  )}
                  
                  {movieDetails.Director && movieDetails.Director !== 'N/A' && (
                    <Typography paragraph sx={{ mb: 1 }}>
                      <strong>Director:</strong> {movieDetails.Director}
                    </Typography>
                  )}
                  
                  {movieDetails.Actors && movieDetails.Actors !== 'N/A' && (
                    <Typography paragraph sx={{ mb: 1 }}>
                      <strong>Cast:</strong> {movieDetails.Actors}
                    </Typography>
                  )}
                  
                  {movieDetails.Genre && movieDetails.Genre !== 'N/A' && (
                    <Typography paragraph sx={{ mb: 1 }}>
                      <strong>Genre:</strong> {movieDetails.Genre}
                    </Typography>
                  )}
                </Box>
              </Box>
            </>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default App;