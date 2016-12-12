import { createStore, combineReducers } from 'redux';
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

const store = createStore(reducers);

export default store;
