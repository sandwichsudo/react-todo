import {
    USER_AUTH_SUCCESS,
    ADD_PRODUCT_TO_BASKET_SUCCESS,
    REMOVE_PRODUCT_FROM_BASKET_SUCCESS,
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

      case REMOVE_PRODUCT_FROM_BASKET_SUCCESS: {
          const items = {};
          Object.entries(state.user.items).forEach((item) => {
              if (action.key !== item[0]) {
                  items[[item[0]]] = item[1];
              }
          });

          return {
              ...state,
              total: Object.keys(items).length,
              user: {
                  ...state.user,
                  items,
              },
          };
      }

      case LOGOUT_SUCCESS:
          return Object.assign({}, state, { user: {}});
      default: return state;
  }
}
