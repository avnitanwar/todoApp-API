import React from 'react';
import { Box } from '@mui/system';
import { useState } from 'react';
import Spinner from './shared/Spinner';
import { TextField } from '@mui/material';

const AddItem = ({ todos, setTodo }) => {
  const [inputLoader, setInputLoader] = useState(false);
  const [description, setCurrentTodo] = useState('');

  async function addTodo(e) {
    e.preventDefault();
    setInputLoader(true);
    console.log('add todo enters');
    const todoList = { description };
    const token = localStorage.getItem('token-value');
    const response1 = await fetch(
      'https://api-nodejs-todolist.herokuapp.com/task',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(todoList)
      }
    );
    const response2 = await response1.json();
    setTodo([response2.data, ...todos]);
    setCurrentTodo('');
    setInputLoader(false);
    localStorage.setItem('todo-data', JSON.stringify(response2));
  }
  return (
    <form onSubmit={addTodo}>
      <Box sx={{ display: 'flex' }}>
        <TextField
          id="outlined-basic"
          value={description}
          label="AddItem"
          variant="outlined"
          sx={{ m: 2, width: '500px' }}
          onChange={(e) => setCurrentTodo(e.target.value)}
        ></TextField>
        {inputLoader ? (
          <Box sx={{ position: 'relative', top: '26px' }}>
            <Spinner />
          </Box>
        ) : (
          <Box></Box>
        )}
      </Box>
    </form>
  );
};

export default AddItem;
