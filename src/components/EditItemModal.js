import React from 'react';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';

const EditItemModal = ({ todos, setTodo, item, setItem }) => {
  const [input, setInput] = useState(item.description);

  const open = item !== null ? true : false;

  async function editItem(id) {
    const token = localStorage.getItem('token-value');
    const res1 = await fetch(
      `https://api-nodejs-todolist.herokuapp.com/task/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          description: input
        })
      }
    );
    const res2 = await res1.json();
    const updatedItem = res2.data.description;
    const updatedList = todos.map((todoItem) => {
      return todoItem._id === id
        ? { ...todoItem, description: updatedItem }
        : todoItem;
    });
    setTodo(updatedList);
    setItem(null);
  }

  return (
    <Dialog open={open} onClose={() => setItem(null)}>
      <DialogTitle>EDIT TODO</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          margin="dense"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => editItem(item._id)}>DONE</Button>
        <Button onClick={() => setItem(null)}>CANCEL</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditItemModal;
