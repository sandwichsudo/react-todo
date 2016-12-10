import { USER_AUTH_SUCCESS } from '../actions/action-types';

const initialUserState = {
  user: []
}

export default function getProducts(state = initialUserState, action) {
  switch(action.type) {
  case USER_AUTH_SUCCESS:
    return Object.assign({}, state, { user: action.user });
  }
  return state;
}
