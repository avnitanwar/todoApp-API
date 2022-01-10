import React from 'react';
import { Box } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  async function logoutButton() {
    const token = localStorage.getItem('token-value');
    await fetch('https://api-nodejs-todolist.herokuapp.com/user/logout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    localStorage.removeItem('token-value');
    navigate('/');
  }
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
        onClick={logoutButton}
      />
    </Box>
  );
};

export default Logout;
