var firebase = require('firebase/app');
import store from '../store';
import { addProductToBasketSuccess } from '../actions/user-actions';

export default {
    addProductToBasket: (userId, newProduct) => {
        let firebaseRef = firebase.database().ref().child(`users/${userId}/items`);
        firebaseRef.push(newProduct);
        store.dispatch(addProductToBasketSuccess(userId, newProduct));
    }
}
