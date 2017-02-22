var firebase = require('firebase/app');
import store from '../store';
import { productListSuccess, productAddSuccess } from '../actions/product-actions';
import UiApi from './ui-api';

const getProductsUrl = (currentTeam) => {
    return `teams/${currentTeam}/products`;
}

export default {
    getProducts: (currentTeam) => {
        let firebaseRef = firebase.database().ref().child(getProductsUrl(currentTeam));
        return firebaseRef.once('value').then(response => {
            store.dispatch(productListSuccess(response.val()));
            return response.val();
        });
    },
    addProduct: (newProduct, currentTeam, notificationTimer) => {
        newProduct.prodImg = "https://img.tesco.com/Groceries/pi/326/5010478789326/IDShot_225x225.jpg";
        let firebaseRef = firebase.database().ref().child(getProductsUrl(currentTeam));
        firebaseRef.push(newProduct);
        store.dispatch(productAddSuccess(newProduct));
        UiApi.showNewNotification({
            message:`${newProduct.prodName} added to shop!`,
        });
    }
}
