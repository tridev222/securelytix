import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';
import bg from '../assets/background.png';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@securelytix\.com$/.test(email);
  const validatePassword = (pwd) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pwd);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error('Email must be in format yourname@securelytix.com');
      return;
    }

    if (!validatePassword(password)) {
      toast.error('Password must be at least 8 characters and include letters and numbers.');
      return;
    }

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    toast.success('Login successful');
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={8} sx={{ p: 4, bgcolor: 'white', borderRadius: 2 }}>
          <Box display="flex" justifyContent="center" mb={2}>
            <Box
              sx={{
                backgroundColor: 'black',
                borderRadius: 1,
                display: 'inline-flex',
                padding: '6px 12px',
              }}
            >
              <img src={logo} alt="Securelytix Logo" style={{ height: 48 }} />
            </Box>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Box position="relative">
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                sx={{ position: 'absolute', right: 8, top: '30%' }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />}
              label="Remember Me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, bgcolor: 'black', ':hover': { bgcolor: 'grey.900' } }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
