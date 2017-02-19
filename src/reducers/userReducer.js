import {
    USER_AUTH_SUCCESS,
    ADD_TRANSACTION_SUCCESS,
    REMOVE_TRANSACTION_SUCCESS,
    LOGOUT_SUCCESS,
} from '../actions/action-types';

const initialUserState = {
  user: {
      teams: {
          'tvx-0001' : {
              balance: 0,
          }
      }
  }
}

function compare(a,b) {
  if (a.time > b.time)
    return -1;
  if (a.time < b.time)
    return 1;
  return 0;
}

function arrayifyTransactions (transactionHistory) {
    const transactionArray = [];
    for (var key in transactionHistory) {
        if (transactionHistory.hasOwnProperty(key)) {
            transactionHistory[key].key = key;
            transactionArray.push(transactionHistory[key]);
        }
    }
    console.log('unsorted', transactionArray);

    transactionArray.sort(compare);
    console.log('sorted', transactionArray);

    return transactionArray;
}

export default function(state = initialUserState, action) {
  switch(action.type) {
      case USER_AUTH_SUCCESS: {
          let items = action.user.teams ? action.user.teams[action.user.defaultTeam].transactionHistory: {};
          let userCopy = Object.assign({}, action.user);
          userCopy.concatedItems = arrayifyTransactions(items);
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
          userCopy.concatedItems = arrayifyTransactions(currentTeamCopy.transactionHistory);
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
          userCopy.concatedItems = arrayifyTransactions(currentTeamCopy.transactionHistory);
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
