import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';
import { styled } from '@mui/material';

import Spinner from './shared/Spinner';
import SharedButton from './shared/SharedButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(false);

  const Field1 = styled(Typography)({
    marginTop: 10
  });

  async function loginButton() {
    setLoginState(true);
    const data = { email, password };
    const res1 = await fetch(
      'https://api-nodejs-todolist.herokuapp.com/user/login',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
    const res2 = await res1.json();
    const tokenValue = res2.token;
    localStorage.setItem('token-value', tokenValue);
    if (localStorage.getItem('token-value') !== '') {
      navigate('/home');
      setLoginState(false);
    }
  }

  return (
    <Box
      component="span"
      sx={{
        alignItems: 'center',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fafbfc',
        position: 'absolute',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }}
    >
      <Field1 color="#407cc9" gutterBottom variant="h4" align="center">
        LOGIN
      </Field1>
      <br />
      <TextField
        sx={{ m: 1, width: '500px' }}
        id="outlined-basic fullWidth"
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <TextField
        sx={{ m: 1, width: '500px' }}
        id="outlined-basic fullWIdth"
        label="Password"
        type="password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <SharedButton
        handleShow={() => loginButton()}
        buttonText={loginState ? <Spinner /> : 'LOGIN'}
      />
      <br />
      <Link
        style={{ color: '#407cc9', textDecoration: 'none', fontSize: '18px' }}
        to="/register"
      >
        Register for new user
      </Link>
    </Box>
  );
};

export default Login;
