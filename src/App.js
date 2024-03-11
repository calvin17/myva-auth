import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import LoginContainer from './components/LoginContainer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const defaultTheme = createTheme();

export default ({ auth, updateUser }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Routes>
        <Route path="/" element={<LoginContainer />}>
          <Route path="signin" element={<SignIn auth={auth} />} />
          <Route path="signup" element={<SignUp auth={auth} updateUser={updateUser} />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};
