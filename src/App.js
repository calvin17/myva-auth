import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

export default ({ auth, onSignIn }) => {
  // console.log('sign in component props', onSignIn(true));
  return (
    <div>
      <Routes path="/">
        <Route path="signin" element={<SignIn auth={auth} />} />
        <Route path="signup" element={<SignUp auth={auth} />} />
      </Routes>
    </div>
  );
};
