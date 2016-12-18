var firebase = require('firebase/app');
import { browserHistory } from 'react-router';
import store from '../store';
import UiApi from './ui-api';
import {
    addProductToBasketSuccess,
    removeProductFromBasketSuccess,
    userFetchSuccess,
    logoutSuccess,
} from '../actions/user-actions';

const createUser = (user) => {
    user.items = [];
    let { email, displayName, photoURL = '', uid } = user;
    displayName = displayName.indexOf(' ') !== -1 ? displayName.split(' ')[0] : displayName;
    const newUser = { email, displayName, photoURL };
    firebase.database().ref(`users/${uid}`).set(newUser);
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
            UiApi.loaded();
            store.dispatch(userFetchSuccess(Object.assign({...userOb, ...user})));
        }
        browserHistory.push('/');
    });

    // BEWARE! this runs on ANY update to the users properties!
    // firebaseRef.on('value', (snapshot) => {
    //     const user = snapshot.val();
    //     if (user) {
    //         UiApi.loaded();
    //         store.dispatch(userFetchSuccess(Object.assign({...userOb, ...user})));
    //     }
    // });
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
      console.error(error);
    });
}

const removeProductFromBasket = (uid, key) => {
    console.log('key', key);
    let firebaseRef = firebase.database().ref().child(`users/${uid}/items/${key}`).remove()
        .then(() => {
            store.dispatch(removeProductFromBasketSuccess(uid, key));
        })
        .catch((e) => {
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
      console.error('Failed to create user.', error);
    });
};

const addProductToBasket = (uid, newProduct) => {
    let firebaseRef = firebase.database().ref().child(`users/${uid}/items`);
    const key = firebaseRef.push(newProduct).key;
    store.dispatch(addProductToBasketSuccess(uid, newProduct, key));
    UiApi.showNewNotification({
        message:`${newProduct.prodName} added to your tab!`,
    });
};

export default {
    fetchUser,
    createUser,
    onAuth,
    logout,
    createUserFromPassword,
    addProductToBasket,
    removeProductFromBasket,
}
