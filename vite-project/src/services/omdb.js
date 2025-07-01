const API_KEY = '98da00e2'; // Directly using your API key now
const BASE_URL = 'http://www.omdbapi.com/';

export const searchMovies = async (query, page = 1, type = '', year = '') => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}${
        type ? `&type=${type}` : ''
      }${year ? `&y=${year}` : ''}`
    );
    const data = await response.json();
    
    if (data.Response === 'True') {
      return {
        movies: data.Search,
        totalResults: parseInt(data.totalResults),
      };
    } else {
      throw new Error(data.Error || 'Unknown error occurred');
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getMovieById = async (id, plot = 'short') => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=${plot}`
    );
    const data = await response.json();
    
    if (data.Response === 'True') {
      return data;
    } else {
      throw new Error(data.Error || 'Unknown error occurred');
    }
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    throw error;
  }
};

export const getMovieByTitle = async (title, type = '', year = '', plot = 'short') => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}${
        type ? `&type=${type}` : ''
      }${year ? `&y=${year}` : ''}&plot=${plot}`
    );
    const data = await response.json();
    
    if (data.Response === 'True') {
      return data;
    } else {
      throw new Error(data.Error || 'Unknown error occurred');
    }
  } catch (error) {
    console.error('Error fetching movie by title:', error);
    throw error;
  }
};