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
    toggleShowOlderItems,
} from '../actions/ui-actions';
import { createTransactionEvent } from '../helpers/createEvent';
import { TRIMMED_LOCAL_TRANSACTIONS } from '../config/constants';

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

const showNewNotification = (notification, oldTimer) => {
    if (oldTimer) {
        console.log('clearing timeout ', oldTimer);
        window.clearTimeout(oldTimer);
    }
    const notificationTimer = window.setTimeout(hideNotification, 3000);
    console.log('notificationTimer', notificationTimer);
    store.dispatch(showNotification(notification, notificationTimer));
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

const onToggleShowOlderItems = () => {
    store.dispatch(toggleShowOlderItems());
    const event = createTransactionEvent('Show more transactions',
        'All products', TRIMMED_LOCAL_TRANSACTIONS)
    ReactGA.event(event);
}

export default {
    loaded,
    startLoading,
    showNewNotification,
    hideNotification,
    onRouteChange,
    onToggleProfileMenu,
    onToggleShowOlderItems,
}
