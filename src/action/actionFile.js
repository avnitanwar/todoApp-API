import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  DELETE_TODO_REQUEST,
  ADD_TODO_REQUEST,
  SET_CURRENT_TODO,
  SET_EDIT_TODO,
  ADD_NEW_TODO_REQUEST,
  UPDATE_EDIT_TODO_VALUE,
  ADDING_ITEM_LOADER,
  DELETE_ITEM_LOADER,
  LOGIN_LOADER,
  REGISTER_LOADER
} from '../constants/constantContainer';

export const login = (loginInput, navigate) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_LOADER,
      payload: true
    });
    try {
      const res1 = await fetch(
        'https://api-nodejs-todolist.herokuapp.com/user/login',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(loginInput)
        }
      );
      const res2 = await res1.json();
      const tokenValue = res2.token;
      localStorage.setItem('token-value', tokenValue);
      dispatch({
        type: LOGIN_REQUEST,
        payload: {
          email: res2.user.email,
          password: res2.user.password
        }
      });
      dispatch({
        type: LOGIN_LOADER,
        payload: false
      });
    } catch (err) {
      console.log(err);
    }
    if (localStorage.getItem('token-value') !== '') {
      navigate('/home');
    }
  };
};

export const register = (registerInput, navigate) => {
  return async (dispatch) => {
    dispatch({
      type: REGISTER_LOADER,
      payload: true
    });
    try {
      const result = await fetch(
        'https://api-nodejs-todolist.herokuapp.com/user/register',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(registerInput)
        }
      );
      const result2 = await result.json();
      const tokenValue = result2.token;
      localStorage.setItem('token-value', tokenValue);
      dispatch({
        type: REGISTER_REQUEST,
        payload: {
          name: result2.user.name,
          age: result2.user.age,
          email: result2.user.email,
          password: result2.user.password
        }
      });
    } catch (err) {
      console.log(err);
    }

    if (localStorage.getItem('token-value') !== '') {
      navigate('/home');
      dispatch({
        type: REGISTER_LOADER,
        payload: false
      });
    }
  };
};

export const logout = (navigate) => {
  return async (dispatch) => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  };
};
export const addTodo = (e) => {
  return async (dispatch, getState) => {
    try {
      e.preventDefault();
      dispatch({
        type: ADDING_ITEM_LOADER,
        payload: true
      });
      const getCurrentTodoValue = getState();
      const a = getCurrentTodoValue.todosData.currentTodo;
      const todoList = a;
      const token = localStorage.getItem('token-value');
      const response1 = await fetch(
        'https://api-nodejs-todolist.herokuapp.com/task',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ description: todoList })
        }
      );
      const response2 = await response1.json();
      dispatch({
        type: ADD_NEW_TODO_REQUEST,
        payload: response2.data
      });
      dispatch({
        type: SET_CURRENT_TODO,
        payload: ''
      });
      dispatch({
        type: ADDING_ITEM_LOADER,
        payload: false
      });
      localStorage.setItem('todo-data', JSON.stringify(response2));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteTodo = (id, i) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_ITEM_LOADER,
        payload: { [i]: true }
      });
      const token = localStorage.getItem('token-value');
      await fetch(`https://api-nodejs-todolist.herokuapp.com/task/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const todosListState = getState();
      const todos = todosListState.todosData.todosList;
      const filterItems = todos.filter((item) => {
        return item._id !== id;
      });
      dispatch({
        type: DELETE_TODO_REQUEST,
        payload: {
          todosList: filterItems
        }
      });
      dispatch({
        type: DELETE_ITEM_LOADER,
        payload: { [i]: false }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const editTodo = (id) => {
  return async (dispatch, getState) => {
    try {
      const editTodoState = getState();
      const editValue = editTodoState.todosData.updatedTodoValue;
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
            description: editValue
          })
        }
      );
      const res2 = await res1.json();
      const updatedItem = res2.data.description;
      const todoList = editTodoState.todosData.todosList;
      const updatedList = todoList.map((todoItem) => {
        return todoItem._id === id
          ? { ...todoItem, description: updatedItem }
          : todoItem;
      });
      dispatch({
        type: ADD_TODO_REQUEST,
        payload: updatedList
      });
      dispatch({
        type: SET_EDIT_TODO,
        payload: null
      });
      dispatch({
        type: UPDATE_EDIT_TODO_VALUE,
        payload: ''
      });
    } catch (err) {
      console.log(err);
    }
  };
};
