var firebase = require('firebase/app');
import { browserHistory } from 'react-router';
import store from '../store';
import UiApi from './ui-api';
import {
    addProductToBasketSuccess,
    removeProductFromBasketSuccess,
    userFetchSuccess,
    logoutSuccess,
    clearTabSuccess,
} from '../actions/user-actions';
import ReactGA from 'react-ga';

const getUserItemsUrl = (uid, currentTeam) => {
    return `users/${uid}/${currentTeam}/items`;
}

const createUser = (user) => {
    user.items = [];
    console.log('Creating user');
    let { email, displayName, photoURL = '', uid } = user;
    displayName = displayName.indexOf(' ') !== -1 ? displayName.split(' ')[0] : displayName;
    const newUser = { email, displayName, photoURL, teams: [ 'tvx-0001' ] };
    firebase.database().ref(`users/${uid}`).set(newUser)
        .then(() => {
            const userProvider = user.providerData[0].providerId;
            ReactGA.event({
                category: 'Authentication',
                action: 'Registration',
                label: userProvider
            });
            store.dispatch(userFetchSuccess(Object.assign({...user, ...newUser})));
            UiApi.loaded();
            browserHistory.push('/');
        })
        .catch((e) => {
            ReactGA.event({
                category: 'Error',
                action: 'Registration',
                label: 'Failed to create new user'
            });
            browserHistory.push('/login');
            UiApi.loaded();
            console.error(e);
        });
};

const fetchUser = (userOb) => {
    let firebaseRef = firebase.database().ref(`users/${userOb.uid}`);
    console.log('fetching user');
    // check if it is a new user
    firebaseRef.once('value').then((snapshot) => {
        const user = snapshot.val();
        if (!user) {
            console.log(`no user with id ${userOb.uid} found, creating user`);
            createUser(userOb);
        } else {
            console.log('got user!');
            console.log(userOb);
            const userProvider = userOb.providerData[0].providerId;
            ReactGA.event({
                category: 'Registration',
                action: 'Login',
                label: userProvider
            });
            UiApi.loaded();
            store.dispatch(userFetchSuccess(Object.assign({...userOb, ...user})));
            browserHistory.push('/');
        }
    });
};

const onAuth = () => {
    console.log('Setting up listener for auth state change');
    firebase.auth().onAuthStateChanged((userOb) => {
        console.log('Auth state changed');
        if (userOb) {
            console.log('got user object from state change, authenticating..');
            fetchUser(userOb);
        } else {
            console.log('null user object, sending to login');
            browserHistory.push('/login');
        }
    });
}

const logout = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      store.dispatch(logoutSuccess());
    }, (error) => {
        ReactGA.event({
            category: 'Error',
            action: 'Logout',
            label: 'Failed to log out'
        });
      console.error(error);
    });
}

const removeProductFromBasket = (uid, key, currentTeam) => {
    firebase.database().ref().child(`${getUserItemsUrl(uid, currentTeam)}/${key}`).remove()
        .then(() => {
            store.dispatch(removeProductFromBasketSuccess(uid, key));
        })
        .catch((e) => {
            ReactGA.event({
                category: 'Error',
                action: 'Remove from tab',
                label: 'Failed to remove product from tab'
            });
            console.error(e);
        });
};

const createUserFromPassword = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        let modifiedUserOb = Object.assign({}, user);
        modifiedUserOb.displayName = modifiedUserOb.email.split('.')[0];
        createUser(modifiedUserOb);
    })
    .catch(function(error) {
        ReactGA.event({
            category: 'Error',
            action: 'Registration',
            label: 'Failed to create user'
        });
      console.error('Failed to create user.', error);
    });
};

const addProductToBasket = (uid, newProduct, currentTeam) => {
    let firebaseRef = firebase.database().ref().child(getUserItemsUrl(uid, currentTeam));
    const key = firebaseRef.push(newProduct).key;
    store.dispatch(addProductToBasketSuccess(uid, newProduct, key));
    UiApi.showNewNotification({
        message:`${newProduct.prodName} added to your tab!`,
    });
};

const clearTab = (total, uid, currentTeam) => {
    firebase.database().ref().child(getUserItemsUrl(uid, currentTeam))
    .remove()
    .then(() => {
        store.dispatch(clearTabSuccess());
        const formattedTotal = Number(total).toFixed(2);
        UiApi.showNewNotification({
            message:`Thanks for clearing £${formattedTotal} from your tab!`,
        });
    })
    .catch((err) => {
        ReactGA.event({
            category: 'Error',
            action: 'Clear tab',
            label: 'Failed to clear tab'
        });
        console.error(err);
    })
};

export default {
    fetchUser,
    createUser,
    onAuth,
    logout,
    createUserFromPassword,
    addProductToBasket,
    removeProductFromBasket,
    clearTab
}
