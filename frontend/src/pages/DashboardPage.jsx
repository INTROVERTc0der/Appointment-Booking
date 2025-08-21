import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Grid, Card, CardContent, Button,
  CircularProgress, Alert, Avatar
} from '@mui/material';
import { 
  CalendarMonth as CalendarIcon,
  ListAlt as BookingsIcon,
  Person as PersonIcon,
  EventAvailable as EventIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { bookingsAPI } from '../services/api';

const DashboardPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpcomingBookings = async () => {
      try {
        setLoading(true);
        const response = await bookingsAPI.getMyBookings();
        const now = new Date();
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(now.getDate() + 7);
        
        const upcoming = response.data
          .filter(booking => booking?.slot?.startTime && new Date(booking.slot.startTime) > now && new Date(booking.slot.startTime) <= oneWeekFromNow)
          .sort((a, b) => new Date(a.slot.startTime) - new Date(b.slot.startTime))
          .slice(0, 3);
        
        setUpcomingBookings(upcoming);
      } catch (err) {
        setError('Failed to load upcoming appointments');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchUpcomingBookings();
  }, [user]);

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f7fa">
        <CircularProgress sx={{ color: '#6a11cb' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 6, 
    // background: '#f5f7fa' 
    }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: '#6a11cb' }}>
            Welcome back, {user?.name}!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Here's your upcoming appointments and quick actions
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Grid container spacing={4}>
          {/* Upcoming Appointments */}
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 6, background: 'linear-gradient(145deg, #ffffff, #e0e0ff)' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h6" fontWeight="bold">Upcoming Appointments</Typography>
                  <Button variant="contained" startIcon={<CalendarIcon />} onClick={() => navigate('/book-slot')} sx={{ bgcolor: '#6a11cb', '&:hover': { bgcolor: '#2575fc' } }}>
                    Book New
                  </Button>
                </Box>

                {upcomingBookings.length > 0 ? (
                  upcomingBookings.map(booking => (
                    <Box key={booking._id} sx={{
                      p: 2, mb: 2, borderRadius: 2,
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      bgcolor: '#ffffff',
                      boxShadow: 2,
                      cursor: 'pointer',
                      transition: '0.3s',
                      '&:hover': { bgcolor: '#e0e0ff', transform: 'scale(1.02)' }
                    }} onClick={() => navigate('/my-bookings')}>
                      <Box>
                        <Typography fontWeight="medium">{formatDate(booking.slot.startTime)}</Typography>
                        <Typography variant="body2" color="text.secondary">Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</Typography>
                      </Box>
                      <EventIcon sx={{ color: '#6a11cb' }} />
                    </Box>
                  ))
                ) : (
                  <Box textAlign="center" py={6}>
                    <BookingsIcon sx={{ fontSize: 60, color: '#6a11cb', opacity: 0.7 }} />
                    <Typography variant="h6" mt={2}>No upcoming appointments</Typography>
                    <Button variant="contained" sx={{ mt: 3, bgcolor: '#6a11cb', '&:hover': { bgcolor: '#2575fc' } }} onClick={() => navigate('/book-slot')}>
                      Book an Appointment
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 6, background: 'linear-gradient(145deg, #ffffff, #e0ffe0)' }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Quick Actions</Typography>
                <Box display="flex" flexDirection="column" gap={2} mt={2}>
                  <Button fullWidth variant="outlined" startIcon={<CalendarIcon />} onClick={() => navigate('/book-slot')} sx={{ transition: '0.3s', '&:hover': { bgcolor: '#6a11cb', color: '#fff' } }}>Book Appointment</Button>
                  <Button fullWidth variant="outlined" startIcon={<BookingsIcon />} onClick={() => navigate('/my-bookings')} sx={{ transition: '0.3s', '&:hover': { bgcolor: '#6a11cb', color: '#fff' } }}>My Appointments</Button>
                  <Button fullWidth variant="outlined" startIcon={<PersonIcon />} onClick={() => navigate('/profile')} sx={{ transition: '0.3s', '&:hover': { bgcolor: '#6a11cb', color: '#fff' } }}>My Profile</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;
