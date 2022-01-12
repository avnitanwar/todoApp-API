import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';

import Spinner from './shared/Spinner';
import SharedButton from './shared/SharedButton';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();
  const [registerState, setRegisterState] = useState(false);

  async function registerButton() {
    setRegisterState(true);
    const newUser = { name, age, email, password };
    const result = await fetch(
      'https://api-nodejs-todolist.herokuapp.com/user/register',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
      }
    );
    const result2 = await result.json();
    const tokenValue = result2.token;
    localStorage.setItem('token-value', tokenValue);
    if (localStorage.getItem('token-value') !== '') {
      navigate('/home');
      setRegisterState(false);
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
      <Typography
        sx={{ marginTop: 10 }}
        color="#407cc9"
        gutterBottom
        variant="h4"
        align="center"
      >
        REGISTER
      </Typography>
      <br />
      <Box
        component="span"
        sx={{
          display: 'flex'
        }}
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          sx={{ m: 2, width: '230px' }}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Age"
          variant="outlined"
          sx={{ m: 2, width: '230px' }}
          onChange={(e) => setAge(e.target.value)}
        />
      </Box>
      <TextField
        sx={{ m: 1, width: '500px' }}
        id="outlined-basic"
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <TextField
        sx={{ m: 1, width: '500px' }}
        id="outlined-basic"
        label="Password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <SharedButton
        handleShow={() => registerButton()}
        buttonText={registerState ? <Spinner /> : 'REGISTER'}
      />
      <br />
    </Box>
  );
};

export default Register;
