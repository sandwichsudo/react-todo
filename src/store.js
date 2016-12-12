import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import productsReducer from './reducers/productsReducer';
import uiReducer from './reducers/uiReducer';

// Combine Reducers
const reducers = combineReducers({
  userReducer,
  productsReducer,
  uiReducer,
});

const store = createStore(reducers);

export default store;
