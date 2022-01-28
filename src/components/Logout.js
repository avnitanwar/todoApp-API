import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';

import { useDispatch } from 'react-redux';
import { logout } from '../action/actionFile';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        width: '100%',
        height: '8%',
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: '#407cc9',
        marginBottom: 2
      }}
    >
      <LogoutIcon
        sx={{ color: 'white', fontSize: 27, p: 2 }}
        onClick={() => dispatch(logout(navigate))}
      />
    </Box>
  );
};

export default Logout;
