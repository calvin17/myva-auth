import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import LoginContainer from './components/LoginContainer.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';

const defaultTheme = createTheme();

const AuthApp = ({ auth, updateUser }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Routes>
        <Route path="signin" element={<SignIn auth={auth} />} />
        <Route path="signup" element={<SignUp auth={auth} updateUser={updateUser} />} />
        <Route path="*" element={<SignIn auth={auth} />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AuthApp;