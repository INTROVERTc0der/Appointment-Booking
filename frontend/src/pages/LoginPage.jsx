import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link, 
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return setError('Please fill in all fields');
    }
    try {
      setError('');
      setLoading(true);
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      const { success, error } = await login(trimmedEmail, trimmedPassword);
      if (success) {
        navigate('/');
      } else {
        setError(error || 'Failed to log in');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      component="main" 
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        // background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
        // background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
      }}
    >
      <Paper 
        elevation={6} 
        sx={{ 
          p: 5, 
          borderRadius: 4, 
          width: '100%',
          backgroundColor: '#fff',
          boxShadow: '0px 8px 24px rgba(0,0,0,0.2)'
        }}
      >
        <Typography 
          component="h1" 
          variant="h4" 
          align="center" 
          gutterBottom 
          sx={{ fontWeight: 700, color: '#4f46e5' }}
        >
          Welcome Back
        </Typography>
        <Typography 
          variant="body2" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 3 }}
        >
          Sign in to continue
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #4338ca 0%, #7e22ce 100%)',
              }
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign In'}
          </Button>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link 
              component={RouterLink} 
              to="/register" 
              variant="body2" 
              sx={{ 
                textDecoration: 'none',
                color: '#4f46e5',
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
