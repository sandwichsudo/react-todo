import store from '../store';

import {
    viewLoadedSuccess,
    startViewLoading,
    showNotification,
    closeNotification,
} from '../actions/ui-actions';

const loaded = () => {
    store.dispatch(viewLoadedSuccess());
}

const startLoading = () => {
    store.dispatch(startViewLoading());
}

const hideNotification = () => {
    store.dispatch(closeNotification());
}

const showNewNotification = (notification) => {
    store.dispatch(showNotification(notification));
    window.setTimeout(hideNotification, 3000);
}

export default {
    loaded,
    startLoading,
    showNewNotification,
    hideNotification
}
