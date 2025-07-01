// src/components/SearchFilters.jsx
import { Box, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { useState, useEffect } from 'react';

const SearchFilters = ({ filters, setFilters }) => {
  const [year, setYear] = useState(filters.year || '');
  const [type, setType] = useState(filters.type || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ year, type });
    }, 500);

    return () => clearTimeout(timer);
  }, [year, type, setFilters]);

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
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
    </Box>
  );
};

export default SearchFilters;