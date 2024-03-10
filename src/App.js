import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

export default ({ auth, updateUser }) => {
  return (
    <div>
      <Routes path="/">
        <Route path="signin" element={<SignIn auth={auth} />} />
        <Route path="signup" element={<SignUp auth={auth} updateUser={updateUser} />} />
      </Routes>
    </div>
  );
};
