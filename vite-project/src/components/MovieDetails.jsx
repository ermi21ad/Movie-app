import { Dialog, DialogTitle, DialogContent, DialogActions, 
    Button, Typography, Chip, Stack, Box, Divider, IconButton, 
    LinearProgress, Rating } from '@mui/material';
  import { PlayCircle, Close, Star, CalendarMonth, Schedule, 
    Theaters, Language, Bookmark, Share, Info } from '@mui/icons-material';
  import { motion } from 'framer-motion';
  
  const MovieDetails = ({ movie, open, onClose, loading }) => {
    if (!movie) return null;
  
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(26, 26, 26, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 3,
            overflow: 'hidden',
          }
        }}
      >
        {loading && <LinearProgress color="secondary" />}
        
        {/* Hero Section with Backdrop */}
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              height: { xs: 200, md: 300 },
              background: movie.Poster !== 'N/A' 
                ? `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(10,10,10,0.9)), url(${movie.Poster})`
                : 'linear-gradient(135deg, #0f0c29, #302b63)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'flex-end',
              p: 4,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h3" sx={{ 
                fontWeight: 800, 
                mb: 1,
                textShadow: '0 2px 8px rgba(0,0,0,0.8)'
              }}>
                {movie.Title}
              </Typography>
              
              <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                {movie.Year && (
                  <Chip 
                    icon={<CalendarMonth />} 
                    label={movie.Year} 
                    size="small" 
                    sx={{ background: 'rgba(255,255,255,0.1)' }}
                  />
                )}
                
                {movie.Runtime && movie.Runtime !== 'N/A' && (
                  <Chip 
                    icon={<Schedule />} 
                    label={movie.Runtime} 
                    size="small" 
                    sx={{ background: 'rgba(255,255,255,0.1)' }}
                  />
                )}
                
                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                  <Chip 
                    icon={<Star sx={{ color: 'gold' }} />} 
                    label={`${movie.imdbRating}/10`} 
                    size="small" 
                    sx={{ 
                      background: 'rgba(255,215,0,0.1)',
                      border: '1px solid rgba(255,215,0,0.3)'
                    }}
                  />
                )}
                
                {movie.Rated && movie.Rated !== 'N/A' && (
                  <Chip 
                    label={movie.Rated} 
                    size="small" 
                    sx={{ 
                      background: 'rgba(255,255,255,0.1)',
                      fontWeight: 'bold'
                    }}
                  />
                )}
              </Stack>
            </Box>
            
            <IconButton 
              onClick={onClose} 
              sx={{ 
                position: 'absolute', 
                top: 16, 
                right: 16, 
                background: 'rgba(0,0,0,0.7)',
                '&:hover': {
                  background: 'rgba(255,255,255,0.2)',
                }
              }}
            >
              <Close />
            </IconButton>
          </Box>
        </Box>
  
        {/* Main Content */}
        <DialogContent sx={{ p: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: 4 
          }}>
            {/* Left Column - Details */}
            <Box sx={{ flex: 1 }}>
              {/* Rating Section */}
              {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    IMDb Rating
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Rating 
                      value={parseFloat(movie.imdbRating) / 2} 
                      precision={0.1} 
                      readOnly 
                      sx={{ color: '#f5c518' }}
                    />
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {movie.imdbRating}
                      <Typography 
                        component="span" 
                        sx={{ fontSize: '0.6em', opacity: 0.8, ml: 0.5 }}
                      >
                        /10
                      </Typography>
                    </Typography>
                  </Box>
                  {movie.imdbVotes && movie.imdbVotes !== 'N/A' && (
                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                      {parseInt(movie.imdbVotes).toLocaleString()} votes
                    </Typography>
                  )}
                </Box>
              )}
  
              {/* Plot Section */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Synopsis
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  {movie.Plot}
                </Typography>
              </Box>
  
              <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />
  
              {/* Metadata Grid */}
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 3 
              }}>
                {movie.Director && movie.Director !== 'N/A' && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      <Info sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                      Director
                    </Typography>
                    <Typography>{movie.Director}</Typography>
                  </Box>
                )}
                
                {movie.Writer && movie.Writer !== 'N/A' && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      <Info sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                      Writer
                    </Typography>
                    <Typography>{movie.Writer}</Typography>
                  </Box>
                )}
                
                {movie.Actors && movie.Actors !== 'N/A' && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      <Info sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                      Cast
                    </Typography>
                    <Typography>{movie.Actors}</Typography>
                  </Box>
                )}
                
                {movie.Genre && movie.Genre !== 'N/A' && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      <Info sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                      Genre
                    </Typography>
                    <Typography>{movie.Genre}</Typography>
                  </Box>
                )}
                
                {movie.Language && movie.Language !== 'N/A' && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      <Info sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                      Language
                    </Typography>
                    <Typography>{movie.Language}</Typography>
                  </Box>
                )}
                
                {movie.Country && movie.Country !== 'N/A' && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      <Info sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                      Country
                    </Typography>
                    <Typography>{movie.Country}</Typography>
                  </Box>
                )}
              </Box>
            </Box>
  
            {/* Right Column - Poster */}
            {movie.Poster && movie.Poster !== 'N/A' && (
              <Box sx={{ 
                width: { xs: '100%', md: 300 }, 
                height: { xs: 400, md: 450 },
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
                flexShrink: 0,
                mt: { xs: 2, md: 0 },
                position: 'relative'
              }}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <img 
                    src={movie.Poster} 
                    alt={movie.Title} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                </motion.div>
              </Box>
            )}
          </Box>
        </DialogContent>
  
        {/* Action Buttons */}
        <DialogActions sx={{ 
          p: 3, 
          borderTop: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(0,0,0,0.3)'
        }}>
          <Stack 
            direction="row" 
            spacing={2} 
            sx={{ width: '100%' }}
            justifyContent="space-between"
          >
            <Button
              variant="outlined"
              startIcon={<Bookmark />}
              sx={{
                borderColor: 'rgba(255,255,255,0.2)',
                '&:hover': {
                  borderColor: '#00b4d8',
                  background: 'rgba(0, 180, 216, 0.1)'
                }
              }}
            >
              Save to Watchlist
            </Button>
            
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="contained"
                startIcon={<PlayCircle />}
                sx={{
                  background: 'linear-gradient(to right, #00b4d8, #0096c7)',
                  '&:hover': {
                    background: 'linear-gradient(to right, #0096c7, #0077b6)',
                  },
                  minWidth: 200
                }}
                onClick={() => window.open(`https://www.imdb.com/title/${movie.imdbID}`, '_blank')}
              >
                View on IMDb
              </Button>
            </motion.div>
          </Stack>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default MovieDetails;