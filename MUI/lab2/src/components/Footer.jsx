import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

/**
 * Footer Component
 * 
 * Purpose: This is a simple functional component that displays at the bottom of the page.
 * It shows how to use MUI's 'Box' (like a div) and 'Typography' (like p or h tags).
 */
const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto', 
        backgroundColor: '#1976d2', // Professional blue color
        color: 'white' 
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Movie Explorer - Created for ITI Lab 2
        </Typography>
        <Typography variant="body2" align="center">
          Built with React and Material UI
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
