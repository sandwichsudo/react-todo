import {
    USER_AUTH_SUCCESS,
    ADD_PRODUCT_TO_BASKET_SUCCESS,
    REMOVE_PRODUCT_FROM_BASKET_SUCCESS,
    LOGOUT_SUCCESS,
} from '../actions/action-types';

const initialUserState = {
  user: {
      items: {}
  }
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
          let stateCopy = Object.assign({}, state);
          const index = Object.keys(stateCopy.user.items).length;
          const hasItems = index !== 0;
          if (hasItems) {
              stateCopy.user.items[index] = action.newProduct;
          } else {
              stateCopy.user.items =  {0: action.newProduct };
          }

          return stateCopy;
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
