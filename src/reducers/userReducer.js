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
      teams: {
          'tvx-0001' : {
              balance: 0,
          }
      }
  }
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
          let items = action.user.teams ? action.user.teams[action.user.defaultTeam].transactionHistory: {};
          let userCopy = Object.assign({}, action.user);
          userCopy.concatedItems = items;
          console.log('user', userCopy);
          return Object.assign({}, state, { user: userCopy, currentTeam: userCopy.defaultTeam });
      }
      case ADD_PRODUCT_TO_BASKET_SUCCESS: {
          let currentTeamCopy = Object.assign({}, state.user.teams[state.currentTeam]);
          currentTeamCopy.transactionHistory = currentTeamCopy.transactionHistory ? currentTeamCopy.transactionHistory : {};
          const key = action.key;
          currentTeamCopy.transactionHistory[key] = action.newProductEvent;
          currentTeamCopy.balance = currentTeamCopy.balance + action.newProductEvent.value;
          const userCopy = Object.assign({}, state.user);
          userCopy.concatedItems = currentTeamCopy.transactionHistory;
          userCopy.teams[state.currentTeam] = currentTeamCopy;
          return {
                ...state,
                user: userCopy,
            };;
      }
      case REMOVE_PRODUCT_FROM_BASKET_SUCCESS: {
          let currentTeamCopy = Object.assign({}, state.user.teams[state.currentTeam]);
          delete currentTeamCopy.transactionHistory[action.key];
          currentTeamCopy.balance = currentTeamCopy.balance + action.productEvent.value;
          const userCopy = Object.assign({}, state.user);
          userCopy.concatedItems = currentTeamCopy.transactionHistory;
          userCopy.teams[state.currentTeam] = currentTeamCopy;
          return  {
                ...state,
                user: userCopy,
            };
      }
      case LOGOUT_SUCCESS:
          return Object.assign({}, state, { user: {}});
      case CLEAR_TAB_SUCCESS: {
          let stateCopy = Object.assign({}, state);
          stateCopy.user.teams[stateCopy.currentTeam].items = {};
          stateCopy.user.concatedItems = {};
          return stateCopy;
      }
      default: return state;
  }
}
