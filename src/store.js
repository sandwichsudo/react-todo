import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import reduxLogger from 'redux-logger';
import userReducer from './reducers/userReducer';
import productsReducer from './reducers/productsReducer';
import uiReducer from './reducers/uiReducer';
import adminReducer from './reducers/adminReducer';

// Combine Reducers
const reducers = combineReducers({
  userReducer,
  productsReducer,
  uiReducer,
  adminReducer,
});

const logger = reduxLogger();
const store = createStore(reducers, applyMiddleware(logger));

export default store;
