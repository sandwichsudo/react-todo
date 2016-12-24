import {
    USER_AUTH_SUCCESS,
    ADD_PRODUCT_TO_BASKET_SUCCESS,
    REMOVE_PRODUCT_FROM_BASKET_SUCCESS,
    LOGOUT_SUCCESS,
    CLEAR_TAB_SUCCESS
} from '../actions/action-types';

const initialUserState = {
  user: {
      items: {}
  },
  total: 0
}

function concatItems(items) {
    let filteredItems = {};
    for (let itemKey in items) {
        if (items.hasOwnProperty(itemKey)) {
            const item = items[itemKey];
            if (!filteredItems[item.id]) {
                filteredItems[item.id] = item;
                filteredItems[item.id].count = 1;
            } else {
                filteredItems[item.id].count += 1;
            }
        }
    }
    return filteredItems;
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
          let userCopy = Object.assign({}, action.user);
          userCopy.concatedItems = concatItems(items);
          return Object.assign({}, state, { user: userCopy, total });
      case ADD_PRODUCT_TO_BASKET_SUCCESS:
          let stateCopy = Object.assign({}, state);
          stateCopy.user.items = stateCopy.user.items ? stateCopy.user.items : {};
          const key = action.key;
          stateCopy.user.items[key] = action.newProduct;
          stateCopy.total = Number(stateCopy.total) + Number(action.newProduct.prodCost);
          stateCopy.user.concatedItems = concatItems(stateCopy.user.items);
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
                  concatedItems: concatItems(items),
              },
          };
      }
      case LOGOUT_SUCCESS:
          return Object.assign({}, state, { user: { items: {}}});
      case CLEAR_TAB_SUCCESS: {
          let stateCopy = Object.assign({}, state);
          stateCopy.user.items = {};
          stateCopy.user.concatedItems = {};
          stateCopy.total = 0;
          return stateCopy;
      }
      default: return state;
  }
}
