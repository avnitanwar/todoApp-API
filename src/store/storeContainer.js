import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { users } from '../reducer/reducerFile';

export const store = createStore(users, applyMiddleware(thunk, logger));
