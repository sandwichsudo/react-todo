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
import ReactGA from 'react-ga';

// const getUserItemsUrl = (uid, currentTeam) => {
//     return `users/${uid}/teams/${currentTeam}/items`;
// }

const getUserUpvotedItemUrl = (uid, currentTeam, productId) => {
    return `users/${uid}/teams/${currentTeam}/upvotedItems/${productId}`;
}

const getUserTransactionHistoryUrl = (uid, currentTeam, productId) => {
    return `users/${uid}/teams/${currentTeam}/transactionHistory`;
}

const getUserBalanceUrl = (uid, currentTeam) => {
    return `users/${uid}/teams/${currentTeam}/balance`;
}

const createUser = (user) => {
    //user.items = [];
    console.log('Creating user');
    let { email, displayName, photoURL = '', uid } = user;
    displayName = displayName.indexOf(' ') !== -1 ? displayName.split(' ')[0] : displayName;
    const defaultTeam = 'tvx-0001';
    let teams = {};
    teams[defaultTeam] = { balance: 0 };
    const newUser = { email, displayName, photoURL, teams, defaultTeam };
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

const removeProductFromBasket = (uid, key, currentTeam, price, name) => {
    firebase.database().ref().child(`${getUserTransactionHistoryUrl(uid, currentTeam)}/${key}`).remove()
        .then(() => {
            const productEvent = {
                category: 'Product',
                action:'Remove from tab',
                label: name,
                value: -Number(price)
            };
            console.log('removed product', productEvent);
            ReactGA.event(productEvent);
            store.dispatch(removeProductFromBasketSuccess(key, productEvent));
            let firebaseRefBalance = firebase.database().ref().child(getUserBalanceUrl(uid, currentTeam));
            firebaseRefBalance.once('value').then((snapshot) => {
                const balance = snapshot.val();
                const newBalance = Number(balance) - Number(price);
                firebaseRefBalance.set(newBalance);
                console.log('old balance', balance);
                console.log('newProduct.prodCost', price);
                console.log('new balance', newBalance);
                event.oldBalance = balance;
                event.newBalance = newBalance;
                console.log(event);
            });
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
        console.log('Creating user');
        let modifiedUserOb = Object.assign({}, user);
        modifiedUserOb.displayName = modifiedUserOb.email.split('.')[0];
        createUser(modifiedUserOb);
    })
    .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
            console.log('User recognised, logging in');
            firebase.auth().signInWithEmailAndPassword(email, password)
                .catch((error) => {
                    ReactGA.event({
                        category: 'Error',
                        action: 'Login',
                        label: 'Failed to login password user'
                    });
                    UiApi.showNewNotification({
                        message: error.message,
                    });
                    UiApi.loaded();
                    console.error('Failed to login user.', error);
                });
        } else {
            ReactGA.event({
                category: 'Error',
                action: 'Registration',
                label: 'Failed to create user'
            });
            UiApi.showNewNotification({
                message: error.message,
            });
            UiApi.loaded();
            console.error('Failed to create user.', error);
        }

    });
};

const addProductToBasket = (uid, newProduct, currentTeam) => {
    // let firebaseRef = firebase.database().ref().child(getUserItemsUrl(uid, currentTeam));
    // const key = firebaseRef.push(newProduct).key;

    UiApi.showNewNotification({
        message:`You bought a ${newProduct.prodName}! Click to see your activity`,
        isLink: true,
        location: 'tab',
    });
    const event = {
        category: 'Product',
        action:'Add to tab',
        label: newProduct.prodName,
        value: -Number(newProduct.prodCost)
    };

    ReactGA.event(event);
    let firebaseRefBalance = firebase.database().ref().child(getUserBalanceUrl(uid, currentTeam));
    firebaseRefBalance.once('value').then((snapshot) => {
        const balance = snapshot.val();
        const newBalance = Number(balance) - Number(newProduct.prodCost);
        firebaseRefBalance.set(newBalance);
        console.log('old balance', balance);
        console.log('newProduct.prodCost', newProduct.prodCost);
        console.log('new balance', newBalance);
        event.oldBalance = balance;
        event.newBalance = newBalance;
        console.log(event);
        let firebaseRefTH = firebase.database().ref().child(getUserTransactionHistoryUrl(uid, currentTeam));
        const transactionHistoryKey = firebaseRefTH.push(event).key;
        store.dispatch(addProductToBasketSuccess(event, transactionHistoryKey));
    });

};

const upvoteRestock = (uid, product, currentTeam) => {
    console.log(uid, product, currentTeam);
    let firebaseRef = firebase.database().ref().child(getUserUpvotedItemUrl(uid, currentTeam, product.id));
    firebaseRef.set(1);
    ReactGA.event({
        category: 'Product',
        action:'Request restock',
        label: product.prodName
    });
    UiApi.showNewNotification({
        message:`Thanks, you voted to restock ${product.prodName}!`,
    });
};

const updateBalance = (uid, currentTeam, amountToAdd) => {
    let firebaseRefBalance = firebase.database().ref().child(getUserBalanceUrl(uid, currentTeam));
    return firebaseRefBalance.once('value').then((snapshot) => {
        const balance = snapshot.val();
        const newBalance = Number(balance) + Number(amountToAdd);
        firebaseRefBalance.set(newBalance);
    });
};

const createTransactionEvent = (action, productName, value) => {
    return {
        category: 'Product',
        action: action,
        label: productName,
        value,
    };
}

const addTransaction = (uid, currentTeam, event) => {
    let firebaseRefTH = firebase.database().ref().child(getUserTransactionHistoryUrl(uid, currentTeam));
    const key = firebaseRefTH.push(event).key;
    store.dispatch(addProductToBasketSuccess(event, key));
    browserHistory.push('/tab');
};

const addToBalance = (uid, currentTeam, amountToAdd) => {
    updateBalance(uid, currentTeam, amountToAdd).then(() => {
        const event = createTransactionEvent('Add credit', 'Credit', Number(amountToAdd).toFixed(0));
        ReactGA.event(event);
        addTransaction(uid, currentTeam, event);
    });
}

export default {
    fetchUser,
    createUser,
    onAuth,
    logout,
    createUserFromPassword,
    addProductToBasket,
    removeProductFromBasket,
    upvoteRestock,
    addToBalance
}
