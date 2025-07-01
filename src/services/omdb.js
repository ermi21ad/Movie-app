const API_KEY = '98da00e2';
const BASE_URL = 'http://www.omdbapi.com/';

export const searchMovies = async (query, { type = '', year = '', rating = '' } = {}) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${query}${
        type ? `&type=${type}` : ''
      }${year ? `&y=${year}` : ''}`
    );
    const data = await response.json();
    
    if (data.Response === 'True') {
      // Filter by rating if specified
      let movies = data.Search || [];
      if (rating) {
        movies = movies.filter(movie => 
          movie.imdbRating && parseFloat(movie.imdbRating) >= parseFloat(rating)
        );
      }
      
      return {
        movies,
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

export const getMovieById = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`
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