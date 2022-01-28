import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import {
  UPDATE_EDIT_TODO_VALUE,
  SET_EDIT_TODO
} from '../constants/constantContainer';
import { editTodo } from '../action/actionFile';

const EditItemModal = () => {
  const dispatch = useDispatch();
  //const todos = useSelector((state) => state.todosData.todosList); //todos
  const editTodoValue = useSelector((state) => state.todosData.editTodoValue); //item
  const updatededitTodoValue = useSelector(
    (state) => state.todosData.updatedTodoValue
  ); //input

  const open = editTodoValue !== null ? true : false;

  return (
    <Dialog
      open={open}
      onClose={() => dispatch({ type: SET_EDIT_TODO, payload: null })}
    >
      <DialogTitle>EDIT TODO</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          value={updatededitTodoValue}
          onChange={(e) =>
            dispatch({ type: UPDATE_EDIT_TODO_VALUE, payload: e.target.value })
          }
          margin="dense"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(editTodo(editTodoValue._id))}>
          DONE
        </Button>
        <Button
          onClick={() => dispatch({ type: SET_EDIT_TODO, payload: null })}
        >
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditItemModal;
