var firebase = require('firebase/app');
import { browserHistory } from 'react-router';
import store from '../store';
import { addProductToBasketSuccess, userAuthSuccess } from '../actions/user-actions';

const authenticateUser = (userOb) => {
    let firebaseRef = firebase.database().ref(`users/${userOb.uid}`);
    firebaseRef.on('value', (snapshot) => {
        const user = snapshot.val();
        if (user) {
            let modifiedUserOb = Object.assign({}, userOb);
            modifiedUserOb.displayName = modifiedUserOb.displayName.split(' ')[0];
            store.dispatch(userAuthSuccess({...user, ...modifiedUserOb}));
            browserHistory.push('/');
        }
    });
};

const createUser = (user) => {
    console.log('Creating user ', user.email);
    user.items = [];
    let { email, displayName, photo = '', uid } = user;
    displayName = displayName ? displayName.slice(' ')[0] : email.slice('.')[0];
    const newUser = {};
    newUser[uid] = { email, displayName, photo };
    const firebaseRef = firebase.database().ref(`users/${uid}`);
    firebaseRef.on('value', (snapshot) => {
            console.log('snapshot.val()', snapshot.val());
            // const value = snapshot.val();
            // if (value && value.items) {
            //     this.items = value.items;
            //     this.setState({
            //         items: this.items
            //     });
            // }
        });
//    firebase.database().ref('users').push(newUser);
};

export default {
    authenticateUser,
    createUser,
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
