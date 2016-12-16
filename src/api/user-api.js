var firebase = require('firebase/app');
import { browserHistory } from 'react-router';
import store from '../store';
import UiApi from './ui-api';
import {
    addProductToBasketSuccess,
    userAuthSuccess,
    logoutSuccess,
} from '../actions/user-actions';

const createUser = (user) => {
    user.items = [];
    let { email, displayName, photoURL = '', uid } = user;
    displayName = displayName.indexOf(' ') !== -1 ? displayName.split(' ')[0] : displayName;
    const newUser = { email, displayName, photoURL };
    firebase.database().ref(`users/${uid}`).set(newUser);
};

const authenticateUser = (userOb) => {

    let firebaseRef = firebase.database().ref(`users/${userOb.uid}`);

    // check if it is a new user
    firebaseRef.once('value').then((snapshot) => {
        if (!snapshot.val()) {
            createUser(userOb);
        }
    });

    // BEWARE! this runs on ANY update to the users properties!
    firebaseRef.on('value', (snapshot) => {
        const user = snapshot.val();
        if (user) {
            UiApi.loaded();
            store.dispatch(userAuthSuccess(Object.assign({...userOb, ...user})));
        }
    });
    browserHistory.push('/');
};

const onAuth = () => {
    firebase.auth().onAuthStateChanged((userOb) => {
        if (userOb) {
            authenticateUser(userOb);
        } else {
            browserHistory.push('/login');
        }
    });
}

const logout = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      store.dispatch(logoutSuccess());
    }, (error) => {
      console.error(error);
    });
}

export default {
    authenticateUser,
    createUser,
    onAuth,
    logout,
    createUserFromPassword: (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            let modifiedUserOb = Object.assign({}, user);
            modifiedUserOb.displayName = modifiedUserOb.email.split('.')[0];
            createUser(modifiedUserOb);
        })
        .catch(function(error) {
          console.error('Failed to create user.', error);
        });
    },
    addProductToBasket: (uid, newProduct) => {
        let firebaseRef = firebase.database().ref().child(`users/${uid}/items`);
        firebaseRef.push(newProduct);
        store.dispatch(addProductToBasketSuccess(uid, newProduct));
        UiApi.showNewNotification({
            message:'Product added to basket!',
        });
    }
}
