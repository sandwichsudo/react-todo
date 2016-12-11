import {
    USER_AUTH_SUCCESS,
    ADD_PRODUCT_TO_BASKET_SUCCESS,
    USER_CREATED_SUCCESS
} from '../actions/action-types';

const initialUserState = {
  user: []
}

export default function(state = initialUserState, action) {
  switch(action.type) {
      case USER_AUTH_SUCCESS:
          return Object.assign({}, state, { user: action.user });
      case ADD_PRODUCT_TO_BASKET_SUCCESS: {
          return Object.assign({}, state, { items: action.newProduct } );
      }
  }
  return state;
}
