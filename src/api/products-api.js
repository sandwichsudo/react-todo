var firebase = require('firebase/app');
import store from '../store';
import { productListSuccess, productAddSuccess } from '../actions/product-actions';

export default {
    getProducts: () => {
        let firebaseRef = firebase.database().ref().child('products');
        return firebaseRef.once('value').then(response => {
            store.dispatch(productListSuccess(response.val()));
            return response.val();
        });
    },
    addProduct: (newProduct) => {
        let firebaseRef = firebase.database().ref().child('products');
        firebaseRef.push(newProduct);
        store.dispatch(productAddSuccess(newProduct));
    }
}
