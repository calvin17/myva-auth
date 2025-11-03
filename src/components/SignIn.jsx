import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { checkValidData } from '../utils/validate';

function Copyright(props) {
  return (
    <Typography variant="body2" sx={{ color: '#ffffff', textDecoration: 'none' }} align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://d1oux9c9ebwgi8.cloudfront.net/">
        MYVA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const StyledTextField = styled(TextField)`
  & label {
    color: #a4a9c2;
  }
  & label.Mui-focused {
    color: white;
  }
  & .MuiOutlinedInput-root {
    fieldset {
      border-color: #a4a9c2;
    }

    &.Mui-focused fieldset {
      border-color: white;
    }
  }
`;

export default function SignIn({ auth }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = checkValidData(data.get('email'), data.get('password'));
    if (!message) {
      signInWithEmailAndPassword(auth, data.get('email'), data.get('password'))
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('user', user);
          navigate('/');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode}: ${errorMessage}`);
        });
    } else {
      setErrorMessage(message);
    }
  };

  return (
    <Grid
      container
      component="main"
      maxWidth="xs"
      sx={{ height: '100vh',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        sx={{
          mx: 4,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '400px',
          borderRadius: '12px',
          backgroundColor: 'rgba(0 0 0 / 0.5)',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#5668BC' }}>
          <LoginIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                sx={{
                  [`&, &.${checkboxClasses.checked}`]: {
                    color: '#5668BC',
                  },
                }}
              />
            }
            label="Remember me"
          />
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link sx={{ color: '#ffffff', textDecoration: 'none' }} href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                sx={{ color: '#ffffff', textDecoration: 'none' }}
                component={RouterLink}
                variant="body2"
                to="/auth/signup"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </Grid>
  );
}
