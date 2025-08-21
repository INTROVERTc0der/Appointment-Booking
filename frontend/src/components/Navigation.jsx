import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = user ? [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Book', path: '/book-slot' },
    { label: 'My Appointments', path: '/my-bookings' },
    ...(isAdmin ? [{ label: 'Admin', path: '/admin' }] : [])
  ] : [
    { label: 'Home', path: '/' },
    { label: 'Book', path: '/book-slot' },
  ];

  return (
    <AppBar 
      position="static" 
      elevation={3}
      sx={{
        // background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        background: '#6a11cb',
        color: 'white',
        borderRadius: 0,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Brand */}
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ 
            textDecoration: 'none', 
            color: 'white',
            fontWeight: 'bold',
            letterSpacing: 1,
            transition: '0.3s',
            '&:hover': {
              opacity: 0.8,
            }
          }}
        >
          DoctorHelp
        </Typography>
        
        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button 
              key={item.label} 
              component={RouterLink} 
              to={item.path}
              sx={{
                color: 'white',
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: 2,
                }
              }}
            >
              {item.label}
            </Button>
          ))}
          
          {user ? (
            <Button 
              onClick={() => {
                logout();
                navigate('/login');
              }}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: 2,
                }
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button 
                component={RouterLink} 
                to="/login" 
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: 2,
                  }
                }}
              >
                Login
              </Button>
              <Button 
                component={RouterLink} 
                to="/register" 
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: 'white',
                  color: '#2575fc',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  }
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
