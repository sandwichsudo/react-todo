import {
    USER_AUTH_SUCCESS,
    ADD_TRANSACTION_SUCCESS,
    REMOVE_TRANSACTION_SUCCESS,
    LOGOUT_SUCCESS,
} from '../actions/action-types';
import { arrayifyTransactions } from '../helpers/transformers';
const initialUserState = {
  user: {
      teams: {
          'tvx-0001' : {
              balance: 0,
          }
      }
  }
}

const TRIMMED_LOCAL_TRANSACTIONS = 20;

export default function(state = initialUserState, action) {
  switch(action.type) {
      case USER_AUTH_SUCCESS: {
          let items = action.user.teams ? action.user.teams[action.user.defaultTeam].transactionHistory: {};
          let userCopy = Object.assign({}, action.user);
          const sortedItems = arrayifyTransactions(items);
          userCopy.concatedItems = sortedItems.slice(1, TRIMMED_LOCAL_TRANSACTIONS);
          userCopy.olderItems = sortedItems.slice(TRIMMED_LOCAL_TRANSACTIONS);
          console.log('user', userCopy);
          return Object.assign({}, state, { user: userCopy, currentTeam: userCopy.defaultTeam });
      }
      case ADD_TRANSACTION_SUCCESS: {
          let currentTeamCopy = Object.assign({}, state.user.teams[state.currentTeam]);
          currentTeamCopy.transactionHistory = currentTeamCopy.transactionHistory ? currentTeamCopy.transactionHistory : {};
          const key = action.key;
          currentTeamCopy.transactionHistory[key] = action.newTransactionEvent;
          currentTeamCopy.balance = Number(currentTeamCopy.balance) + Number(action.newTransactionEvent.value);
          const userCopy = Object.assign({}, state.user);
          const sortedItems = arrayifyTransactions(currentTeamCopy.transactionHistory);
          userCopy.concatedItems = sortedItems.slice(1, TRIMMED_LOCAL_TRANSACTIONS);
          userCopy.olderItems = sortedItems.slice(TRIMMED_LOCAL_TRANSACTIONS);
          userCopy.teams[state.currentTeam] = currentTeamCopy;
          return {
                ...state,
                user: userCopy,
            };
      }
      case REMOVE_TRANSACTION_SUCCESS: {
          let currentTeamCopy = Object.assign({}, state.user.teams[state.currentTeam]);
          delete currentTeamCopy.transactionHistory[action.key];
          currentTeamCopy.balance = Number(currentTeamCopy.balance) + Number(action.productEvent.value);
          const userCopy = Object.assign({}, state.user);
          const sortedItems = arrayifyTransactions(currentTeamCopy.transactionHistory);
          userCopy.concatedItems = sortedItems.slice(1, TRIMMED_LOCAL_TRANSACTIONS);
          userCopy.olderItems = sortedItems.slice(TRIMMED_LOCAL_TRANSACTIONS);
          userCopy.teams[state.currentTeam] = currentTeamCopy;
          return  {
                ...state,
                user: userCopy,
            };
      }
      case LOGOUT_SUCCESS:
          return Object.assign({}, state, { user: {}});
      default: return state;
  }
}
