import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Stack } from '@mui/material';
import { useState, useEffect } from 'react';

const AdvancedFilters = ({ filters, setFilters }) => {
  const [year, setYear] = useState(filters.year || '');
  const [type, setType] = useState(filters.type || '');
  const [rating, setRating] = useState(filters.rating || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ year, type, rating });
    }, 300);

    return () => clearTimeout(timer);
  }, [year, type, rating, setFilters]);

  return (
    <Box sx={{ mt: 3 }}>
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="movie">Movie</MenuItem>
            <MenuItem value="series">Series</MenuItem>
            <MenuItem value="episode">Episode</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          label="Year"
          value={year}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || /^\d{4}$/.test(value)) {
              setYear(value);
            }
          }}
          inputProps={{ maxLength: 4 }}
        />
        
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="rating-label">Min Rating</InputLabel>
          <Select
            labelId="rating-label"
            value={rating}
            label="Min Rating"
            onChange={(e) => setRating(e.target.value)}
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="7">7+</MenuItem>
            <MenuItem value="8">8+</MenuItem>
            <MenuItem value="9">9+</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default AdvancedFilters;