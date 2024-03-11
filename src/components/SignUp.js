import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { PROFILE_URL_PLACEHOLDER } from '../utils/constants';
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
    color: black;
  }
  & label.Mui-focused {
    color: white;
  }
  & .MuiOutlinedInput-root {
    fieldset {
      border-color: black;
    }

    &.Mui-focused fieldset {
      border-color: white;
    }
  }
`;

export default function SignUp({ auth, updateUser }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = checkValidData(data.get('email'), data.get('password'));
    if (!message) {
      createUserWithEmailAndPassword(auth, data.get('email'), data.get('password'))
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: `${data.get('firstName')} ${data.get('lastName')}`,
            photoURL: PROFILE_URL_PLACEHOLDER,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              updateUser({ uid, email, displayName, photoURL });
              navigate('/');
            })
            .catch((error) => {
              setErrorMessage(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode}: ${errorMessage}`);
          console.log(`${errorCode}: ${errorMessage}`);
        });
    } else {
      setErrorMessage(message);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box
        sx={{
          my: 8,
          mx: 4,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '400px',
          height: '500px',
          borderRadius: '12px',
          backgroundColor: 'rgba(0 0 0 / 0.5)',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#5668BC' }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                component={RouterLink}
                sx={{ color: '#ffffff', textDecoration: 'none' }}
                variant="body2"
                to="/auth/signin"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 1 }} />
        </Box>
      </Box>
    </Container>
  );
}
