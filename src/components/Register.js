import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';

import Spinner from './shared/Spinner';
import SharedButton from './shared/SharedButton';

import { register } from '../action/actionFile';

import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerState = useSelector((state) => state.userData.registerLoader);

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
        handleShow={() =>
          dispatch(
            register(
              { name: name, age: age, email: email, password: password },
              navigate
            )
          )
        }
        buttonText={registerState ? <Spinner /> : 'REGISTER'}
      />
      <br />
    </Box>
  );
};

export default Register;
