import React from 'react';
import { CssBaseline, AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import MovieList from './components/MovieList';
import Footer from './components/Footer';

/**
 * App Component
 * 
 * Purpose: This is the 'Root' of our application. 
 * It sets up the overall layout: Header, Main Content Area, and Footer.
 */
function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* CssBaseline resets browser styles to a consistent baseline for MUI */}
      <CssBaseline />

      {/* --- HEADER (Navbar) --- */}
      <AppBar position="relative">
        <Toolbar>
          <MovieIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            ITI Movie App - Lab 2
          </Typography>
        </Toolbar>
      </AppBar>

      {/* --- MAIN CONTENT --- */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Simple Hero Section */}
        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Movie Explorer
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Discover the latest and most popular movies from around the world.
              Built specifically for modern React learning.
            </Typography>
          </Container>
        </Box>

        {/* The MovieList component handles its own data fetching and display */}
        <MovieList />
      </Box>

      {/* --- FOOTER --- */}
      <Footer />
    </Box>
  );
}

export default App;
