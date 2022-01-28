import React from 'react';

import { Box } from '@mui/system';
import { TextField } from '@mui/material';

import Spinner from './shared/Spinner';

import { useDispatch, useSelector } from 'react-redux';

import { SET_CURRENT_TODO } from '../constants/constantContainer';
import { addTodo } from '../action/actionFile';

const AddItem = () => {
  const inputLoader = useSelector((state) => state.todosData.addingItemLoader);
  const currentTodo = useSelector((state) => state.todosData.currentTodo);
  const dispatch = useDispatch();

  return (
    <form onSubmit={(e) => dispatch(addTodo(e))}>
      <Box sx={{ display: 'flex' }}>
        <TextField
          id="outlined-basic"
          value={currentTodo}
          label="AddItem"
          variant="outlined"
          sx={{ m: 2, width: '500px' }}
          onChange={(e) =>
            dispatch({ type: SET_CURRENT_TODO, payload: e.target.value })
          }
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
