import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  DELETE_TODO_REQUEST,
  SET_CURRENT_TODO,
  ADD_TODO_REQUEST,
  SET_EDIT_TODO,
  UPDATE_EDIT_TODO_VALUE,
  ADD_NEW_TODO_REQUEST,
  ADDING_ITEM_LOADER,
  DELETE_ITEM_LOADER,
  LOGIN_LOADER,
  REGISTER_LOADER
} from '../constants/constantContainer';

const initialState = {
  userData: {
    email: '',
    password: '',
    name: '',
    age: '',
    loginLoader: false,
    registerLoader: false
  },
  todosData: {
    todosList: [],
    currentTodo: '',
    editTodoValue: null,
    updatedTodoValue: '',
    addingItemLoader: false,
    deleteItemLoader: {}
  }
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        userData: action.payload
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        userData: {
          name: action.payload.name,
          age: action.payload.age,
          email: action.payload.email,
          password: action.payload.password
        }
      };
    case ADD_TODO_REQUEST:
      return {
        ...state,
        todosData: {
          ...state.todosData,
          todosList: action.payload
        }
      };

    case DELETE_TODO_REQUEST:
      return {
        ...state,
        todosData: {
          ...state.todosData,
          todosList: action.payload.todosList
        }
      };
    case SET_CURRENT_TODO:
      return {
        ...state,
        todosData: {
          ...state.todosData,
          currentTodo: action.payload
        }
      };
    case SET_EDIT_TODO:
      return {
        ...state,
        todosData: {
          ...state.todosData,
          editTodoValue: action.payload
        }
      };
    case UPDATE_EDIT_TODO_VALUE:
      return {
        ...state,
        todosData: {
          ...state.todosData,
          updatedTodoValue: action.payload
        }
      };
    case ADD_NEW_TODO_REQUEST:
      const newTodoList = state.todosData.todosList.concat(action.payload);
      return {
        ...state,
        todosData: { ...state.todosData, todosList: newTodoList }
      };
    case ADDING_ITEM_LOADER:
      return {
        ...state,
        todosData: {
          ...state.todosData,
          addingItemLoader: action.payload
        }
      };
    case DELETE_ITEM_LOADER:
      return {
        ...state,
        todosData: {
          ...state.todosData,
          deleteItemLoader: action.payload
        }
      };
    case LOGIN_LOADER:
      return {
        ...state,
        userData: {
          ...state.userData,
          loginLoader: action.payload
        }
      };
    case REGISTER_LOADER:
      return {
        ...state,
        userData: {
          ...state.userData,
          registerLoader: action.payload
        }
      };
    default:
      return state;
  }
};
