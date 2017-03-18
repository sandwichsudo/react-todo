var firebase = require('firebase/app');
import { browserHistory } from 'react-router';
import store from '../store';
import UiApi from './ui-api';
import ProductsApi from './products-api';
import {
    addTransactionSuccess,
    removeTransactionSuccess,
    userFetchSuccess,
    logoutSuccess,
} from '../actions/user-actions';
import ReactGA from 'react-ga';
import { formatPrice } from '../helpers/priceFormatting';
import createEvent from '../helpers/createEvent';
import createUrl from '../helpers/createUrl';

const createUser = (user) => {
    console.log('Creating user');
    let { email, displayName, photoURL = '', uid } = user;
    if (displayName && displayName.indexOf(' ') !== -1) {
        displayName = displayName.split(' ')[0];
    }
    else {
        displayName = email.split('@')[0];
    }
    const defaultTeam = 'tvx-0001';
    let teams = {};
    teams[defaultTeam] = { balance: 0 };
    const accountInfo = { email, displayName, photoURL, defaultTeam, migratedItems: true };
    const newUser = { accountInfo, teams };
    firebase.database().ref(`users/${uid}`).set(newUser)
        .then(() => {
            const userProvider = user.providerData[0].providerId;
            ReactGA.event({
                category: 'Authentication',
                action: 'Registration',
                label: userProvider
            });
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

const removeTransactionFromHistory = (uid, key, currentTeam, product) => {
    console.log('Removing item with key: ', key);
    UiApi.startLoading(key);

    firebase.database().ref().child(`${createUrl.getUserTransactionHistoryUrl(uid, currentTeam)}/${key}`).remove()
        .then(() => {
            const donation = product.donation ? product.donation : 0;
            const productEvent = createEvent
                .createTransactionEvent('Remove from tab', product.name,
                    -Number(product.value), Number(donation));
            console.log('removed product', productEvent);
            const donationValue = Number(donation);
            ProductsApi.updateDonation(currentTeam, donationValue);
            ReactGA.event(productEvent);
            store.dispatch(removeTransactionSuccess(key, productEvent));
            let firebaseRefBalance = firebase.database().ref().child(createUrl
                    .getUserBalanceUrl(uid, currentTeam));
            firebaseRefBalance.once('value').then((snapshot) => {
                const balance = snapshot.val();
                const newBalance = Number(balance) - Number(product.value);
                firebaseRefBalance.set(newBalance);
                console.log('old balance', balance);
                console.log('newProduct.prodCost', product.value);
                console.log('new balance', newBalance);
                event.oldBalance = balance;
                event.newBalance = newBalance;
                console.log(event);
                UiApi.loaded(key);
            }).catch((err) => {
                ReactGA.event({
                    category: 'Error',
                    action: 'Update balance',
                    label: 'Failed to update balance'
                });
                console.error(err);
                UiApi.loaded(key);
                UiApi.showNewNotification({
                    message: err,
                });
            });
        })
        .catch((e) => {
            ReactGA.event({
                category: 'Error',
                action: 'Remove from tab',
                label: 'Failed to remove product from tab'
            });
            console.error(e);
            UiApi.loaded(key);
            UiApi.showNewNotification({
                message: e,
            });
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

const addTransactionToHistory = (uid, newProduct, currentTeam,
        notificationTimer) => {
    const event = createEvent
        .createTransactionEvent('Add to tab', newProduct.prodName,
            -Number(newProduct.prodCost), -Number(newProduct.donation));
    ReactGA.event(event);
    let firebaseRefBalance = firebase.database().ref().child(createUrl
            .getUserBalanceUrl(uid, currentTeam));
    firebaseRefBalance.once('value').then((snapshot) => {
        const balance = snapshot.val();
        const newBalance = Number(balance) - Number(newProduct.prodCost);
        firebaseRefBalance.set(newBalance);
        event.oldBalance = balance;
        event.newBalance = newBalance;
        ProductsApi.updateDonation(currentTeam, Number(newProduct.donation));
        console.log(event);
        let firebaseRefTH = firebase.database().ref().child(createUrl.getUserTransactionHistoryUrl(uid, currentTeam));
        const transactionHistoryKey = firebaseRefTH.push(event).key;
        store.dispatch(addTransactionSuccess(event, transactionHistoryKey));
        UiApi.showNewNotification({
            message:`You bought a ${newProduct.prodName}! Your new balance is ${formatPrice(newBalance)}. Click to see your activity`,
            isLink: true,
            location: 'activity',
        }, notificationTimer);
    });

};

const upvoteRestock = (uid, product, currentTeam) => {
    console.log(uid, product, currentTeam);
    let firebaseRef = firebase.database().ref().child(createUrl.getUserUpvotedItemUrl(uid, currentTeam, product.id));
    firebaseRef.set(1);

    ReactGA.event(createEvent.createTransactionEvent('Request restock', product.prodName, 1, 0));
    UiApi.showNewNotification({
        message:`Thanks, you voted to restock ${product.prodName}!`,
    });
};

const updateBalance = (uid, currentTeam, amountToAdd) => {
    let firebaseRefBalance = firebase.database().ref().child(createUrl
            .getUserBalanceUrl(uid, currentTeam));
    return firebaseRefBalance.once('value').then((snapshot) => {
        const balance = snapshot.val();
        const newBalance = Number(balance) + Number(amountToAdd);
        firebaseRefBalance.set(newBalance);
    });
};

const setMigratedFlag = (uid, currentTeam) => {
    firebase.database().ref()
        .child(createUrl.getUserItemMigrationUrl(uid, currentTeam))
            .set(true);
};

const addTransaction = (uid, currentTeam, event) => {
    let firebaseRefTH = firebase.database().ref().child(createUrl.getUserTransactionHistoryUrl(uid, currentTeam));
    const key = firebaseRefTH.push(event).key;
    store.dispatch(addTransactionSuccess(event, key));
    browserHistory.push('/activity');
};

const addToBalance = (uid, currentTeam, amountToAdd) => {
    updateBalance(uid, currentTeam, amountToAdd).then(() => {
        const event = createEvent.createTransactionEvent('Add cash', 'Cash', Number(amountToAdd).toFixed(0), 0);
        ReactGA.event(event);
        addTransaction(uid, currentTeam, event);
    });
}

const migrateUser = (uid, userTeam, items) => {
    const transactionHistory = {};
    let balance = 0;
    for (var itemKey in items) {
        if (items.hasOwnProperty(itemKey)) {
            const item = items[itemKey];
            const event = createEvent
                .createTransactionEvent('Item migration',
                    item.prodName, -Number(item.prodCost), 0);
            transactionHistory[itemKey] = event;
            balance -= item.prodCost;
        }
    }
    console.log(transactionHistory);
    let firebaseRef = firebase.database().ref(createUrl.getUserTransactionHistoryUrl(uid, userTeam));
    firebaseRef.set(transactionHistory);
    updateBalance(uid, userTeam, balance);
    setMigratedFlag(uid, userTeam);
    return { transactionHistory, balance };
}

const migrateItems = (uid, userTeam) => {
    return firebase.database().ref()
        .child(createUrl.getUserItemsHistoryUrl(uid, userTeam))
        .once('value').then((snapshot) => {
            const userItems = snapshot.val();
            console.log('Migrating user');
            return migrateUser(uid, userTeam, userItems);
        });
}

const finishedFetchingUser = (userProvider, accountInfo, userOb, transactionHistory, balance) => {
    ReactGA.event({
        category: 'Registration',
        action: 'Login',
        label: userProvider
    });
    UiApi.loaded();
    const user = {...userOb, ...accountInfo };
    const th = transactionHistory ? transactionHistory : {};
    store.dispatch(userFetchSuccess(user, th, balance));
    browserHistory.push('/');
}

const fetchUser = (userOb) => {
    let firebaseRef = firebase.database().ref(`users/${userOb.uid}/accountInfo`);
    console.log('fetching user');
    // check if it is a new user
    firebaseRef.once('value').then((snapshot) => {
        const accountInfo = snapshot.val();
        if (!accountInfo) {
            console.log(`no user with id ${userOb.uid} found, creating user`);
            createUser(userOb);
        } else {
            console.log('got user!');
            console.log(accountInfo);
            const userProvider = userOb.providerData[0].providerId;
            const currentTeam = accountInfo.defaultTeam;
            ProductsApi.getDonation(currentTeam);
            // check for migrating items and fetch TransactionHistory

            if (!accountInfo.migratedItems) {
                migrateItems(userOb.uid, currentTeam).then((data) => {
                    finishedFetchingUser(userProvider, accountInfo, userOb,
                        data.transactionHistory, data.balance);
                });
            } else {
                firebase.database().ref(createUrl
                    .getUserTransactionHistoryUrl(userOb.uid, currentTeam))
                    .limitToFirst(50)
                    .once('value').then((snapshot) => {
                    const transactionHistory = snapshot.val();
                    console.log('got transactionHistory', transactionHistory);
                    firebase.database().ref(createUrl.getUserBalanceUrl(userOb.uid, currentTeam))
                        .once('value').then((snapshot) => {
                            const balance = snapshot.val();
                            console.log('got balance', balance);
                            finishedFetchingUser(userProvider, accountInfo, userOb, transactionHistory, balance);
                    });
                });
            }
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

export default {
    fetchUser,
    createUser,
    onAuth,
    logout,
    createUserFromPassword,
    addTransactionToHistory,
    removeTransactionFromHistory,
    upvoteRestock,
    addToBalance
}
