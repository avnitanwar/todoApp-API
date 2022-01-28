import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import EditItemModal from './EditItemModal';

import Logout from './Logout.js';
import AddItem from './AddItem';
import Spinner from './shared/Spinner';
import './style.css';

import { useDispatch, useSelector } from 'react-redux';

import { deleteTodo } from '../action/actionFile';
import {
  ADD_TODO_REQUEST,
  SET_EDIT_TODO
} from '../constants/constantContainer';

const Home = () => {
  const [pageLoader, setPageLoader] = useState(true);

  const deleteLoader = useSelector((state) => state.todosData.deleteItemLoader);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todosData.todosList);
  const editTodoValue = useSelector((state) => state.todosData.editTodoValue);

  useEffect(() => {
    const token = localStorage.getItem('token-value');
    fetch('https://api-nodejs-todolist.herokuapp.com/task', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const todoData = data.data.reverse();
        dispatch({ type: ADD_TODO_REQUEST, payload: todoData });
        setPageLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return pageLoader ? (
    <Box sx={{ position: 'absolute', top: '300px', left: '750px' }}>
      <Spinner />
    </Box>
  ) : (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        backgroundColor: '#fafbfc',
        position: 'absolute',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }}
    >
      <Logout />
      <Typography color="#407cc9" gutterBottom variant="h4" align="center">
        TODO LIST
      </Typography>
      <AddItem />
      <Box>
        {todos.map((todoItem, i) => (
          <p className="inputTodo" key={todoItem._id}>
            <EditIcon
              color="action"
              fontSize="small"
              onClick={() =>
                dispatch({ type: SET_EDIT_TODO, payload: todoItem })
              }
            />
            {todoItem.description}
            {!deleteLoader[i] ? (
              <>
                <CloseIcon
                  color="action"
                  fontSize="small"
                  onClick={() => dispatch(deleteTodo(todoItem._id, i))}
                />
              </>
            ) : (
              <Spinner />
            )}
          </p>
        ))}
        {editTodoValue && <EditItemModal />}
      </Box>
    </Box>
  );
};

export default Home;
