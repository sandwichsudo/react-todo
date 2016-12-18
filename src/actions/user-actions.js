import {
    ADD_PRODUCT_TO_BASKET_SUCCESS,
    REMOVE_PRODUCT_FROM_BASKET_SUCCESS,
    USER_AUTH_SUCCESS,
    USER_CREATED_SUCCESS,
    LOGOUT_SUCCESS,
    CLEAR_TAB_SUCCESS,
} from '../actions/action-types';

export function addProductToBasketSuccess(uid, newProduct, key) {
    return {
        type: ADD_PRODUCT_TO_BASKET_SUCCESS,
        uid,
        newProduct,
        key
    };
}

export function removeProductFromBasketSuccess(uid, key) {
    return {
        type: REMOVE_PRODUCT_FROM_BASKET_SUCCESS,
        uid,
        key
    };
}

export function userFetchSuccess(user) {
    return {
        type: USER_AUTH_SUCCESS,
        user
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

export function clearTabSuccess() {
    return {
        type: CLEAR_TAB_SUCCESS,
    };
}
