import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import BgImage from '../images/nature_bg.jpg';

const LoginContainer = () => {
  return (
    <Box
      className="bg-img"
      sx={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: 'cover',
        color: '#f5f5f5',
      }}
    >
      <Outlet />
    </Box>
  );
};

export default LoginContainer;
