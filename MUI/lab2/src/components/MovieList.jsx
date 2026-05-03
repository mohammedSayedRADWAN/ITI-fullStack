import React, { useState, useEffect } from 'react';
import { Grid, Typography, CircularProgress, Container, Box, Alert } from '@mui/material';
import MovieCard from './MovieCard';

/**
 * MovieList Component
 * 
 * Purpose: This component handles the 'heavy lifting'. 
 * 1. It manages state (movies, loading, error).
 * 2. It fetches data from an API when it first loads.
 * 3. It maps through the movie data to display a grid of MovieCard components.
 */
const MovieList = () => {
  // --- STATES ---
  // movies: stores the list of movies from the API
  const [movies, setMovies] = useState([]);
  // isLoading: true while the API is still responding
  const [isLoading, setIsLoading] = useState(true);
  // error: stores any error message if the fetch fails
  const [error, setError] = useState(null);

  // Your TMDB API Token (Read Access Token)
  const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2MwMjRiZTJlYTc3NmVmMTJlNWRjMWE4ZmU1Nzk3MyIsIm5iZiI6MTc3NjY5NzUxMi41OTIsInN1YiI6IjY5ZTY0MGE4ZDJiNTgzMzRhYjU0YTI0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2a76tc6f-QRle8FpGxDDANW_g5khpWqnYj2CHUi5uWc";
  const API_URL = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

  // --- FETCHING DATA ---
  // useEffect tells React to run this code only once when the component mounts (loads).
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true); // Start loading

        // Step 1: Use the built-in 'fetch' function with Authorization header
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_TOKEN}`
          }
        });

        // Step 2: Check if the response is OK (status 200)
        if (!response.ok) {
          throw new Error('Failed to fetch movies. Please check your API token.');
        }

        // Step 3: Convert the raw response into JSON
        const data = await response.json();

        // Step 4: Update our 'movies' state with the results
        setMovies(data.results);
        setIsLoading(false); // Stop loading
      } catch (err) {
        // If anything goes wrong, save the error message
        setError(err.message);
        setIsLoading(false); // Stop loading even if there's an error
      }
    };

    fetchMovies();
  }, [API_URL]); // dependency array: if API_URL changes, this runs again.

  // --- CONDITIONAL RENDERING ---

  // 1. Show a loading spinner if we are still fetching
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading Movies...</Typography>
      </Box>
    );
  }

  // 2. Show an error message if something went wrong
  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">Error: {error}</Alert>
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
          * Reminder: Make sure your API Token is valid and has not expired!
        </Typography>
      </Box>
    );
  }

  // 3. Show the movies in a Grid if everything is fine
  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
        Popular Movies
      </Typography>

      {/* Grid container organizes the cards into rows and columns */}
      <Grid container spacing={4}>
        {movies.map((movie) => (
          // Grid item defines how many columns the card takes at different screen sizes
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            {/* We pass the 'movie' object as a prop to MovieCard */}
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieList;
