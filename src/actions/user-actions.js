import {
    ADD_PRODUCT_TO_BASKET_SUCCESS,
    USER_AUTH_SUCCESS,
    USER_CREATED_SUCCESS,
    LOGOUT_SUCCESS,
} from '../actions/action-types';

export function addProductToBasketSuccess(newProduct) {
    return {
        type: ADD_PRODUCT_TO_BASKET_SUCCESS,
        newProduct
    };
}

export function userAuthSuccess(user) {
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
