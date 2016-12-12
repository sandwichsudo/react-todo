import { USERS_LIST_SUCCESS } from '../actions/action-types';

export function usersListSuccess(usersList) {
  return {
    type: USERS_LIST_SUCCESS,
    usersList
  };
}
