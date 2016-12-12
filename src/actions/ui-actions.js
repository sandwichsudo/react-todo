import {
    VIEW_LOADED,
    START_VIEW_LOADING
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
