import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';

/**
 * MovieCard Component
 * 
 * Props:
 * - movie: An object containing movie details (title, poster_path, etc.)
 * 
 * Purpose: This component displays a single movie's information in a stylized card.
 * We use 'CardMedia' to show the movie poster and 'Typography' for text.
 */
const MovieCard = ({ movie }) => {
  // Base URL for TMDB images
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea>
        {/* If the movie has a poster, we show it; otherwise, we could show a placeholder */}
        <CardMedia
          component="img"
          height="400"
          image={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
          alt={movie.title}
        />
        <CardContent>
          {/* Typography 'h6' makes the title look like a heading */}
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {movie.title}
          </Typography>
          
          {/* variant="body2" and color="text.secondary" is great for descriptions */}
          <Typography variant="body2" color="text.secondary">
            Release Date: {movie.release_date}
          </Typography>
          
          {/* Showing the rating */}
          <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', mt: 1 }}>
            Rating: ⭐ {movie.vote_average}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
