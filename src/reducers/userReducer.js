import {
    USER_AUTH_SUCCESS,
    ADD_PRODUCT_TO_BASKET_SUCCESS,
    REMOVE_PRODUCT_FROM_BASKET_SUCCESS,
    LOGOUT_SUCCESS,
    CLEAR_TAB_SUCCESS
} from '../actions/action-types';
import ReactGA from 'react-ga';

const initialUserState = {
  user: {
      items: {}
  },
  total: 0
}

function concatItems(items) {
    console.log('items to concat', items);
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
    console.log('items concatenated', filteredItems);

    return filteredItems;
}

export default function(state = initialUserState, action) {
  switch(action.type) {
      case USER_AUTH_SUCCESS: {
          let total = 0;
          let items = action.user.teams ? action.user.teams[action.user.defaultTeam].items: {};
          for (const key in items) {
              if (items.hasOwnProperty(key)) {
                  total+= Number(items[key].prodCost);
              }
          }
          let userCopy = Object.assign({}, action.user);
          userCopy.concatedItems = concatItems(items);
          return Object.assign({}, state, { user: userCopy, total, currentTeam: userCopy.defaultTeam });
      }
      case ADD_PRODUCT_TO_BASKET_SUCCESS: {
          let stateCopy = Object.assign({}, state);
          let currentTeam = stateCopy.currentTeam;
          let blankTeams = {};
          blankTeams[currentTeam] = { items: { key: {}}};
          stateCopy.user.teams = stateCopy.user.teams ? stateCopy.user.teams : blankTeams;
          const key = action.key;
          stateCopy.user.teams[stateCopy.currentTeam].items[key] = action.newProduct;
          stateCopy.total = Number(stateCopy.total) + Number(action.newProduct.prodCost);
          stateCopy.user.concatedItems = concatItems(stateCopy.user.teams[stateCopy.currentTeam].items);
          ReactGA.event({
              category: 'Product',
              action:'Add to tab',
              label: action.newProduct.prodName,
              value: Number(action.newProduct.prodCost) * 100
          });
          return stateCopy;
      }
      case REMOVE_PRODUCT_FROM_BASKET_SUCCESS: {
          let stateCopy = Object.assign({}, state);
          const items = {};
          let removedProduct = {};
          Object.entries(stateCopy.user.teams[stateCopy.currentTeam].items).forEach((item) => {
              // item is an array - 0: key, 1: product object
              // items is an object with key:product
              // we want to rebuild the list of items, filtering
              // out the one with the key which is the same as that of the action
              const key = item[0];
              const product = item[1];
              if (action.key !== key) {
                  items[key] = product;
              } else {
                  removedProduct = product;
              }
          });
          ReactGA.event({
              category: 'Product',
              action:'Remove from tab',
              label: removedProduct.prodName,
              value: -(Number(removedProduct.prodCost) * 100)
          });
          stateCopy.user.teams[stateCopy.currentTeam].items = items;
          stateCopy.total = Number(state.total) - Number(removedProduct.prodCost);
          stateCopy.user.concatedItems = concatItems(items);
          return stateCopy;
      }
      case LOGOUT_SUCCESS:
          return Object.assign({}, state, { user: { items: {}}});
      case CLEAR_TAB_SUCCESS: {
          let stateCopy = Object.assign({}, state);

          ReactGA.event({
              category: 'Payment',
              action:'Clear tab',
              value: -(stateCopy.total * 100)
          });
          stateCopy.user.teams[stateCopy.currentTeam].items = {};
          stateCopy.user.concatedItems = {};
          stateCopy.total = 0;
          return stateCopy;
      }
      default: return state;
  }
}
