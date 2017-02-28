import {
    ADD_TRANSACTION_SUCCESS,
    REMOVE_TRANSACTION_SUCCESS,
    USER_AUTH_SUCCESS,
    USER_CREATED_SUCCESS,
    LOGOUT_SUCCESS,
} from '../actions/action-types';

export function addTransactionSuccess(newTransactionEvent, key) {
    return {
        type: ADD_TRANSACTION_SUCCESS,
        newTransactionEvent,
        key
    };
}

export function removeTransactionSuccess(key, productEvent) {
    return {
        type: REMOVE_TRANSACTION_SUCCESS,
        key,
        productEvent,
    };
}
export function userFetchSuccess(user, transactionHistory, balance) {
    return {
        type: USER_AUTH_SUCCESS,
        user,
        transactionHistory,
        balance,
    };
}

export function createUserSuccess(user) {
    return {
        type: USER_CREATED_SUCCESS,
        user
    };
}

export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS,
    };
}
