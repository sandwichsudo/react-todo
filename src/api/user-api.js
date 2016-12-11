var firebase = require('firebase/app');
import { browserHistory } from 'react-router';
import store from '../store';
import {
    addProductToBasketSuccess,
    userAuthSuccess,
    logoutSuccess,
} from '../actions/user-actions';

const createUser = (user) => {
    user.items = [];
    let { email, displayName, photo = '', uid } = user;
    displayName = displayName.indexOf(' ') != -1 ? displayName.split(' ')[0] : displayName;
    const newUser = { email, displayName, photo };
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

    firebaseRef.on('value', (snapshot) => {
        const user = snapshot.val();
        if (user) {
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
      browserHistory.push('/login');
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
    addProductToBasket: (userId, newProduct) => {
        let firebaseRef = firebase.database().ref().child(`users/${userId}/items`);
        firebaseRef.push(newProduct);
        store.dispatch(addProductToBasketSuccess(userId, newProduct));
    }
}
