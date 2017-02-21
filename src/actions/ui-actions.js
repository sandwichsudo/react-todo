import {
    VIEW_LOADED,
    START_VIEW_LOADING,
    NEW_NOTIFICATION,
    CLOSE_NOTIFICATION,
    ROUTE_CHANGE,
    TOGGLE_PROFILE_MENU,
    STOP_LOADING_ITEM,
    START_LOADING_ITEM,
} from '../actions/action-types';

export function viewLoadedSuccess() {
    return {
        type: VIEW_LOADED,
    };
}

export function startViewLoading() {
    return {
        type: START_VIEW_LOADING,
    };
}

export function showNotification(notification) {
    return {
        type: NEW_NOTIFICATION,
        notification,
    };
}

export function closeNotification() {
    return {
        type: CLOSE_NOTIFICATION,
    };
}

export function routeChange(title) {
    return {
        type: ROUTE_CHANGE,
        title,
    };
}

export function toggleProfileMenu() {
    return {
        type: TOGGLE_PROFILE_MENU,
    };
}

export function startInlineLoading(key) {
    return {
        type: START_LOADING_ITEM,
        key,
    };
}

export function stopInlineLoading(key) {
    return {
        type: STOP_LOADING_ITEM,
        key,
    };
}
