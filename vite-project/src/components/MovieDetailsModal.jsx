import { Dialog, DialogTitle, DialogContent, DialogActions, 
    Button, Typography, Chip, Stack, Box, Divider, IconButton } from '@mui/material';
  import { Close, Star, CalendarMonth, Schedule } from '@mui/icons-material';
  
  const MovieDetailsModal = ({ movie, onClose }) => {
    if (!movie) return null;
  
    return (
      <Dialog
        open={true}
        onClose={onClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {movie.Title} ({movie.Year})
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                  <Chip icon={<Star />} label={`IMDb: ${movie.imdbRating}`} />
                )}
                {movie.Runtime && movie.Runtime !== 'N/A' && (
                  <Chip icon={<Schedule />} label={movie.Runtime} />
                )}
                {movie.Year && (
                  <Chip icon={<CalendarMonth />} label={movie.Year} />
                )}
              </Stack>
  
              <Typography variant="body1" paragraph>
                {movie.Plot}
              </Typography>
  
              {movie.Director && movie.Director !== 'N/A' && (
                <Typography paragraph>
                  <strong>Director:</strong> {movie.Director}
                </Typography>
              )}
  
              {movie.Actors && movie.Actors !== 'N/A' && (
                <Typography paragraph>
                  <strong>Cast:</strong> {movie.Actors}
                </Typography>
              )}
            </Box>
  
            {movie.Poster && movie.Poster !== 'N/A' && (
              <Box sx={{ width: { xs: '100%', md: 300 } }}>
                <img 
                  src={movie.Poster} 
                  alt={movie.Title} 
                  style={{ width: '100%', borderRadius: 8 }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          {movie.imdbID && (
            <Button 
              variant="contained" 
              href={`https://www.imdb.com/title/${movie.imdbID}`}
              target="_blank"
            >
              View on IMDb
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };
  
  export default MovieDetailsModal;