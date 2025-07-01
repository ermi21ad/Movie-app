import { useState, useEffect, createContext, useMemo } from 'react';
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
  Tabs,
  Tab
} from '@mui/material';
import { 
  MovieFilter, 
  Brightness4, 
  Brightness7, 
  FilterList 
} from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import MovieGrid from './components/MovieGrid';
import SearchBar from './components/SearchBar';
import AdvancedFilters from './components/AdvancedFilters';
import { searchMovies, getMovieById } from './services/omdb';

// Create context for theme and favorites
export const MovieAppContext = createContext();

const GlassPaper = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'rgba(26, 26, 26, 0.8)'
    : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)'}`,
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
  borderRadius: theme.shape.borderRadius,
}));

function App() {
  const theme = useTheme();
  const [mode, setMode] = useState('dark');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('action');
  const [movieDetails, setMovieDetails] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [filters, setFilters] = useState({ type: '', year: '', rating: '' });
  const [showFilters, setShowFilters] = useState(false);

  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.some(fav => fav.imdbID === movie.imdbID);
      return exists ? prev.filter(fav => fav.imdbID !== movie.imdbID) : [...prev, movie];
    });
  };

  const isFavorite = (imdbID) => favorites.some(fav => fav.imdbID === imdbID);

  const fetchMovies = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await searchMovies(query, filters);
      setMovies(result.movies || []);
      if (!result.movies) setError('No movies found. Try a different search.');
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = async (imdbID) => {
    console.log('handleMovieClick called with:', imdbID);
    setSelectedMovieId(imdbID);
    setIsModalOpen(true);
    setIsLoadingDetails(true);
    try {
      console.log('Fetching details for:', imdbID);
      const details = await getMovieById(imdbID);
      console.log('Received details:', details);
      setMovieDetails(details);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setError('Failed to load movie details. Please try again.');
      setIsModalOpen(false);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    fetchMovies();
  }, [query, filters]);

  const contextValue = useMemo(() => ({
    toggleFavorite,
    isFavorite,
    mode,
    toggleColorMode
  }), [favorites, mode]);

  return (
    <MovieAppContext.Provider value={contextValue}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        background: mode === 'dark'
          ? 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)'
          : 'linear-gradient(to bottom, #f5f7fa, #e4e8f0)',
        color: mode === 'dark' ? 'white' : 'text.primary',
      }}>
        <AppBar position="fixed" color={mode === 'dark' ? 'default' : 'inherit'}
          sx={{
            background: mode === 'dark' ? 'rgba(15, 12, 41, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'none',
            borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          }}>
          <Toolbar>
            <MovieFilter sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
              CINEMATIC
            </Typography>
            <IconButton color="inherit" onClick={toggleColorMode} sx={{ mr: 2 }}>
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <IconButton color="inherit" onClick={() => setShowFilters(!showFilters)}>
              <FilterList />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ pt: 12, pb: 8 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 4 }}>
            <Tab label="Browse Movies" />
            <Tab label="My Favorites" />
          </Tabs>

          <Typography variant="h1" sx={{ mb: 4, textAlign: 'center', background: mode === 'dark'
            ? 'linear-gradient(to right, #00b4d8, #ff9e00)'
            : 'linear-gradient(to right, #1976d2, #9c27b0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800 }}>
            {activeTab === 0 ? 'Discover Movies' : 'My Favorites'}
          </Typography>

          <GlassPaper sx={{ p: 4, mb: 6 }}>
            <SearchBar query={query} setQuery={setQuery} onSearch={fetchMovies} />
            {showFilters && (
              <AdvancedFilters filters={filters} setFilters={setFilters} />
            )}
          </GlassPaper>

          {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
              <CircularProgress size={60} thickness={4} />
            </Box>
          ) : (
            <MovieGrid 
              movies={activeTab === 0 ? movies : favorites}
              onMovieClick={handleMovieClick}
            />
          )}
        </Container>
      </Box>

   {isModalOpen && (
  <div className="modal-backdrop">
    <div className="modal-content">
      <button 
        onClick={() => setIsModalOpen(false)}
        className="modal-close-button"
      >
        &times;
      </button>

      <button 
        onClick={() => setIsModalOpen(false)} 
        className="modal-back-button"
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          fontSize: '16px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ← Back to Movies
      </button>

      {isLoadingDetails ? (
        <div className="loading-spinner">Loading...</div>
      ) : movieDetails ? (
        <div className="movie-details">
          <h2>{movieDetails.Title} ({movieDetails.Year})</h2>
          <div className="details-grid">
            {movieDetails.Poster && movieDetails.Poster !== 'N/A' && (
              <img 
                src={movieDetails.Poster} 
                alt={movieDetails.Title}
                className="movie-poster"
              />
            )}
            <div className="details-text">
              <p><strong>Rating:</strong> ⭐ {movieDetails.imdbRating || 'N/A'}</p>
              <p><strong>Plot:</strong> {movieDetails.Plot || 'No plot available'}</p>
              <p><strong>Director:</strong> {movieDetails.Director || 'N/A'}</p>
              <p><strong>Cast:</strong> {movieDetails.Actors || 'N/A'}</p>
              <p><strong>Genre:</strong> {movieDetails.Genre || 'N/A'}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Error loading movie details</p>
      )}
    </div>
  </div>
)}

    </MovieAppContext.Provider>
  );
}

export default App;
