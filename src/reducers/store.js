import { createStore, combineReducers } from 'redux';
// The User Reducer
const initialUserState = {
  user: []
}

const userReducer = function(state = initialUserState, action) {
  switch(action.type) {
  case 'USER_AUTH_SUCCESS':
    return Object.assign({}, state, { user: action.user });
  }
  return state;
}

// Combine Reducers
const reducers = combineReducers({
  userReducer,
});

const store = createStore(reducers);

export default store;
