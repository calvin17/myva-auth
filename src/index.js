// import('./bootstrap');
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

export default () => {
  return (
    <div>
      <Routes path="/">
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
};
