import store from '../store';
import { browserHistory } from 'react-router';
import ReactGA from 'react-ga';

import {
    viewLoadedSuccess,
    startViewLoading,
    showNotification,
    closeNotification,
    routeChange,
    toggleProfileMenu,
    startInlineLoading,
    stopInlineLoading,
} from '../actions/ui-actions';

const loaded = (key) => {
    if (key) {
        store.dispatch(stopInlineLoading(key));
    } else {
        store.dispatch(viewLoadedSuccess());
    }
}

const startLoading = (key) => {
    if (key) {
        store.dispatch(startInlineLoading(key));
    } else {
        store.dispatch(startViewLoading());
    }
}

const hideNotification = () => {
    store.dispatch(closeNotification());
}

const showNewNotification = (notification) => {
    store.dispatch(showNotification(notification));
    window.setTimeout(hideNotification, 3000);
}

const onRouteChange = (data) => {
    let title = browserHistory.getCurrentLocation().pathname.replace('/', '');
    if (!title) {
        title = 'Shop';
    }
    ReactGA.pageview(window.location.pathname);
    store.dispatch(routeChange(title));
}

const onToggleProfileMenu = () => {
    store.dispatch(toggleProfileMenu());
}

export default {
    loaded,
    startLoading,
    showNewNotification,
    hideNotification,
    onRouteChange,
    onToggleProfileMenu
}
