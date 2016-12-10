import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import productsReducer from './reducers/productsReducer';

// Combine Reducers
const reducers = combineReducers({
  userReducer,
  productsReducer,
});

const store = createStore(reducers);

export default store;
