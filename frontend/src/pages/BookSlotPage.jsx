import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Button,
  CircularProgress,
  Alert,
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, addDays, isAfter, isToday } from 'date-fns';
import { slotsAPI, bookingsAPI } from '../services/api';

const BookSlotPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const minDate = new Date();
  const maxDate = addDays(new Date(), 30);

  const formatDateForApi = (date) => format(date, 'yyyy-MM-dd');
  const formatTime = (dateTime) => format(new Date(dateTime), 'h:mm a');

  const fetchSlots = async (date) => {
    try {
      setLoading(true);
      setError('');
      const from = formatDateForApi(date);
      const to = formatDateForApi(addDays(date, 1));
      const response = await slotsAPI.getAvailableSlots(from, to);

      const now = new Date();
      const filteredSlots = response.data.filter(slot => {
        const slotTime = new Date(slot.startTime);
        return isToday(slotTime) ? isAfter(slotTime, now) : true;
      });

      setSlots(filteredSlots);
    } catch (err) {
      console.error('Error fetching slots:', err);
      setError('Failed to load available slots. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchSlots(date);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setOpenDialog(true);
  };

  const handleBookAppointment = async () => {
    try {
      setLoading(true);
      await bookingsAPI.createBooking(selectedSlot._id);
      setOpenDialog(false);
      setBookingSuccess(true);
      fetchSlots(selectedDate);
    } catch (err) {
      console.error('Booking error:', err);
      setError(err.response?.data?.error?.message || 'Failed to book the slot. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots(selectedDate);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 8, 
    // backgroundColor: '#f5f6fa', 
    minHeight: '100vh' }}>
      {/* Page Heading */}
      <Box textAlign="center" sx={{ mb: 6 }}>
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          gutterBottom
          sx={{ color: 'primary.main', letterSpacing: 1 }}
        >
          Book an Appointment
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: '1rem' }}>
          Choose a date and available time slot to schedule your visit.
        </Typography>
      </Box>

      {/* Alerts */}
      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>{error}</Alert>}
      {bookingSuccess && (
        <Alert 
          severity="success" 
          sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}
          onClose={() => setBookingSuccess(false)}
        >
          Appointment booked successfully!
        </Alert>
      )}

      {/* Date & Slots */}
      <Paper 
        elevation={6} 
        sx={{ p: 5, borderRadius: 4, bgcolor: '#ffffff', boxShadow: '0px 10px 25px rgba(0,0,0,0.05)' }}
      >
        {/* Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select a date"
            value={selectedDate}
            onChange={handleDateChange}
            minDate={minDate}
            maxDate={maxDate}
            renderInput={(params) => (
              <TextField 
                {...params} 
                fullWidth 
                sx={{ mb: 5, '& .MuiInputBase-root': { borderRadius: 2, bgcolor: '#f0f2f5' } }} 
              />
            )}
            disablePast
            shouldDisableDate={(date) => date.getDay() === 0 || date.getDay() === 6}
          />
        </LocalizationProvider>

        <Divider sx={{ my: 4 }} />

        {/* Slots Heading */}
        <Typography variant="h6" sx={{ mb: 3, color: 'text.primary', fontWeight: 600 }}>
          Available slots for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </Typography>

        {/* Slots */}
        {loading ? (
          <Box display="flex" justifyContent="center" my={5}>
            <CircularProgress />
          </Box>
        ) : slots.length > 0 ? (
          <Grid container spacing={3}>
            {slots.map((slot) => (
              <Grid item xs={6} sm={4} md={3} key={slot._id}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleSlotSelect(slot)}
                  sx={{
                    py: 2,
                    borderRadius: 3,
                    fontWeight: 600,
                    textTransform: 'none',
                    transition: 'all 0.3s',
                    bgcolor: '#f9fafb',
                    borderColor: '#d1d5db',
                    color: 'text.primary',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      transform: 'scale(1.05)',
                      boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  {formatTime(slot.startTime)} <br /> {formatTime(slot.endTime)}
                </Button>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box 
            textAlign="center" 
            p={6}
            sx={{ 
              border: '1px dashed',
              borderColor: 'grey.300',
              borderRadius: 3,
              bgcolor: '#f9fafb',
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No slots available for this date. Try another one.
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Booking Confirmation Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, p: 3, boxShadow: '0px 10px 30px rgba(0,0,0,0.1)' }
        }}
      >
        <DialogTitle fontWeight="bold" sx={{ color: 'primary.main' }}>Confirm Appointment</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Please confirm your appointment details:
          </Typography>
          <Box sx={{ my: 3, p: 3, bgcolor: '#f3f4f6', borderRadius: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Date: {selectedSlot && format(new Date(selectedSlot.startTime), 'EEEE, MMMM d, yyyy')}
            </Typography>
            <Typography variant="subtitle1">
              Time: {selectedSlot && `${formatTime(selectedSlot.startTime)} - ${formatTime(selectedSlot.endTime)}`}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            You’ll receive a confirmation email with your appointment details.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)} disabled={loading} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleBookAppointment} 
            disabled={loading}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            {loading ? <CircularProgress size={22} sx={{ color: 'white' }} /> : 'Confirm Booking'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookSlotPage;
