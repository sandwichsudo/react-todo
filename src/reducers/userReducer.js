import {
    USER_AUTH_SUCCESS,
    ADD_TRANSACTION_SUCCESS,
    REMOVE_TRANSACTION_SUCCESS,
    LOGOUT_SUCCESS,
} from '../actions/action-types';
import { arrayifyTransactions } from '../helpers/transformers';
import { TRIMMED_LOCAL_TRANSACTIONS } from '../config/constants';
const initialUserState = {
  user: {},
  transactionHistory: {},
  balance:0,
  currentTeam: 'tvx-0001',
}

export default function(state = initialUserState, action) {
  switch(action.type) {
      case USER_AUTH_SUCCESS: {
          let userCopy = Object.assign({}, action.user);
          let items = action.transactionHistory;
          console.log('transactionHistory', items);
          const sortedItems = arrayifyTransactions(items);
          userCopy.concatedItems = sortedItems.slice(0, TRIMMED_LOCAL_TRANSACTIONS);
          userCopy.olderItems = sortedItems.slice(TRIMMED_LOCAL_TRANSACTIONS);
          console.log('user', userCopy);
          const balance = Number(action.balance);
          console.log('balance', balance);
          return Object.assign({}, state, { user: userCopy, balance: balance,
            transactionHistory: items });
      }
      case ADD_TRANSACTION_SUCCESS: {
          let stateCopy = Object.assign({}, state);
          const key = action.key;
          stateCopy.transactionHistory[key] = action.newTransactionEvent;
          const newBalance = Number(stateCopy.balance) + Number(action.newTransactionEvent.value);
          const userCopy = Object.assign({}, state.user);
          const sortedItems = arrayifyTransactions(stateCopy.transactionHistory);
          userCopy.concatedItems = sortedItems.slice(0, TRIMMED_LOCAL_TRANSACTIONS);
          userCopy.olderItems = sortedItems.slice(TRIMMED_LOCAL_TRANSACTIONS);
          return {
                ...state,
                user: userCopy,
                balance: newBalance,
                transactionHistory: stateCopy.transactionHistory,
            };
      }
      case REMOVE_TRANSACTION_SUCCESS: {
          let stateCopy = Object.assign({}, state);
          delete stateCopy.transactionHistory[action.key];
          const newBalance = Number(stateCopy.balance) + Number(action.productEvent.value);
          const userCopy = Object.assign({}, state.user);
          const sortedItems = arrayifyTransactions(stateCopy.transactionHistory);
          userCopy.concatedItems = sortedItems.slice(0, TRIMMED_LOCAL_TRANSACTIONS);
          userCopy.olderItems = sortedItems.slice(TRIMMED_LOCAL_TRANSACTIONS);
          return  {
                ...state,
                user: userCopy,
                balance: newBalance,
                transactionHistory: stateCopy.transactionHistory,
            };
      }
      case LOGOUT_SUCCESS:
          return Object.assign({}, state, initialUserState);
      default: return state;
  }
}
