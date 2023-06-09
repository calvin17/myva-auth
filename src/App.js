import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

export default ({ onSignIn }) => {
  // console.log('sign in component props', onSignIn(true));
  return (
    <div>
      <Routes path="/">
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};
