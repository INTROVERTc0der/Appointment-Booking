import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  Box, 
  Container, 
  CssBaseline, 
  Typography, 
  IconButton, 
  TextField, 
  Button, 
  Divider 
} from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import Navigation from './Navigation';
import { useTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Navigation />

      <Container component="main" sx={{ flex: 1, py: 0, mt: 0 }}>
        <Outlet />
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          pt: 8,
          pb: 4,
          px: 3,
          mt: 'auto',
          background: 'linear-gradient(135deg, #2575fc, #6a11cb)',
          color: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Container maxWidth="lg">
          {/* Main sections */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              gap: { xs: 6, md: 3 },
              mb: 5,
            }}
          >
            {/* Branding / About */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Appointment Booking
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Schedule your appointments easily and efficiently. Our system ensures smooth booking experience with reminders and confirmations.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton sx={{ color: 'white' }}><Facebook /></IconButton>
                <IconButton sx={{ color: 'white' }}><Twitter /></IconButton>
                <IconButton sx={{ color: 'white' }}><LinkedIn /></IconButton>
                <IconButton sx={{ color: 'white' }}><Instagram /></IconButton>
              </Box>
            </Box>

            {/* Quick Links */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Quick Links
              </Typography>
              <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Home</Typography>
              <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>About Us</Typography>
              <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Services</Typography>
              <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Contact</Typography>
            </Box>

            {/* Contact Info */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2">123 Main Street, New Delhi, India</Typography>
              <Typography variant="body2">Email: support@appointments.com</Typography>
              <Typography variant="body2">Phone: +91 98765 43210</Typography>
            </Box>

            {/* Newsletter */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Newsletter
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Subscribe to get the latest updates and offers.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  placeholder="Your email"
                  variant="filled"
                  size="small"
                  sx={{
                    display: 'flex',
                    flex: 1,  
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'white',
                    borderRadius: 1,
                    
                  }}
                />
                <Button variant="contained" sx={{ bgcolor: '#ff6b6b', '&:hover': { bgcolor: '#ff4757' } }}>Subscribe</Button>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)', mb: 3 }} />

          {/* Bottom row */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: { xs: 2, md: 0 },
            }}
          >
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} Appointment Booking System. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Terms of Service</Typography>
              <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Privacy Policy</Typography>
              <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>FAQ</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.palette.mode}
      />
    </Box>
  );
};

export default Layout;
