import {
    VIEW_LOADED,
    START_VIEW_LOADING,
    NEW_NOTIFICATION,
    CLOSE_NOTIFICATION,
    ROUTE_CHANGE,
    TOGGLE_PROFILE_MENU,
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
