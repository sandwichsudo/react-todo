import {
    USER_AUTH_SUCCESS,
    ADD_PRODUCT_TO_BASKET_SUCCESS,
    LOGOUT_SUCCESS,
} from '../actions/action-types';

const initialUserState = {
  user: {}
}

export default function(state = initialUserState, action) {
  switch(action.type) {
      case USER_AUTH_SUCCESS:
          let total = 0;
          let items = action.user.items ? action.user.items : {};
          for (const key in items) {
              if (items.hasOwnProperty(key)) {
                  total+= Number(items[key].prodCost);
              }
          }
          return Object.assign({}, state, { user: action.user, total });
      case ADD_PRODUCT_TO_BASKET_SUCCESS:
          return Object.assign({}, state);//does nothing?
      case LOGOUT_SUCCESS:
          return Object.assign({}, state, { user: {}});
      default: return state;
  }
}
