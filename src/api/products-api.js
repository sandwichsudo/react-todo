var firebase = require('firebase/app');
import store from '../store';
import { productListSuccess, productAddSuccess,
    fetchCharityDonationSuccess, updateCharityDonation } from '../actions/product-actions';
import UiApi from './ui-api';

const getProductsUrl = (currentTeam) => {
    return `teams/${currentTeam}/products`;
}

const getDonationUrl = (currentTeam) => {
    return `teams/${currentTeam}/donation`;
}

const filterByCategory = (val, category) => {
    console.log(val, category);
    if (category === 'all') {
        return val;
    }

    for (var key in val) {
        if (val.hasOwnProperty(key)) {
            const product = val[key];
            if (product.category.toLowerCase() !==
                category.toLowerCase() ) {
                delete val[key];
            }
        }
    }
    return val;
}

const getDonation = (currentTeam) => {
    let firebaseRef = firebase.database().ref().child(getDonationUrl(currentTeam));
    return firebaseRef.once('value').then(response => {
        const donation = response.val();
        store.dispatch(fetchCharityDonationSuccess(donation));
        return donation;
    });
};

export default {
    getProducts: (currentTeam, category) => {
        UiApi.startLoading();
        let firebaseRef = firebase.database().ref().child(getProductsUrl(currentTeam));
        return firebaseRef.once('value').then(response => {
            store.dispatch(productListSuccess(
                filterByCategory(response.val(), category)
            ));
            UiApi.loaded();
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
    },
    updateDonation: (currentTeam, charityDonationUpdate) => {
        getDonation(currentTeam).then((donation) => {
            firebase.database().ref().child(getDonationUrl(currentTeam))
                .set(charityDonationUpdate+donation);
            store.dispatch(updateCharityDonation(charityDonationUpdate));
        });
    },
    getDonation,
}
