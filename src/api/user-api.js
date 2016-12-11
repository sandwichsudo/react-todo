var firebase = require('firebase/app');
import { browserHistory } from 'react-router';
import store from '../store';
import { addProductToBasketSuccess, userAuthSuccess } from '../actions/user-actions';

const authenticateUser = (userOb) => {
    let firebaseRef = firebase.database().ref(`users/${userOb.uid}`);
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

const createUser = (user) => {
    console.log('Creating user ', user.email);
    user.items = [];
    let { email, displayName, photo = '', uid } = user;
    displayName = displayName ? displayName.slice(' ')[0] : email.slice('.')[0];
    const newUser = { email, displayName, photo };
    const firebaseRef = firebase.database().ref(`users/${uid}`).set(newUser);
};

export default {
    authenticateUser,
    createUser,
    onAuth,
    createUserFromPassword: (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            let modifiedUserOb = Object.assign({}, user);
            modifiedUserOb.displayName = modifiedUserOb.email.split('.')[0];
            createUser(modifiedUserOb);
            console.log(user);
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
