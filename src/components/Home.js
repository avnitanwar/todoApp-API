import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import EditItemModal from './EditItemModal';
import './style.css';
import Logout from './Logout.js';
import AddItem from './AddItem';
import Spinner from './shared/Spinner';

const Home = () => {
  const [todos, setTodo] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [deleteLoader, setDeleteLoader] = useState({});
  const [item, setItem] = useState(null);

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
        //console.log(data.data[0]._id)
        const todoData = data.data.reverse();
        setTodo(todoData);
        setPageLoader(false);
      });
  }, []);

  async function deletetodo(id, index) {
    setDeleteLoader({ ...deleteLoader, [index]: true });
    const token = localStorage.getItem('token-value');
    await fetch(`https://api-nodejs-todolist.herokuapp.com/task/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const filterItems = todos.filter((item) => {
      return item._id !== id;
    });
    setTodo(filterItems);
    setDeleteLoader({ ...deleteLoader, [index]: false });
  }

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
      <AddItem todos={todos} setTodo={setTodo} />
      <Box>
        {todos.map((todoItem, i) => (
          <p className="inputTodo" key={todoItem._id}>
            <EditIcon
              color="action"
              fontSize="small"
              onClick={() => setItem(todoItem)}
            />
            {todoItem.description}
            {!deleteLoader[i] ? (
              <>
                <CloseIcon
                  color="action"
                  fontSize="small"
                  onClick={() => deletetodo(todoItem._id, i)}
                />
              </>
            ) : (
              <Spinner />
            )}
          </p>
        ))}
        {item && (
          <EditItemModal
            todos={todos}
            setTodo={setTodo}
            item={item}
            setItem={setItem}
          />
        )}
      </Box>
    </Box>
  );
};

export default Home;
