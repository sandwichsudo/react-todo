import { USERS_LIST_SUCCESS } from '../actions/action-types';

const initialAdminState = {};

export default function(state = initialAdminState, action) {
  switch(action.type) {
      case USERS_LIST_SUCCESS:{
          const hasList = !!state.usersList;
          let usersListCopy = {};
          if (hasList) {
              usersListCopy = state.usersList ? Object.assign({}, state.usersList) : initialAdminState;
          }
          usersListCopy = Object.assign(usersListCopy, action.usersList);
          return Object.assign({}, state, { usersList: usersListCopy });
      }
  }
  return state;
}
