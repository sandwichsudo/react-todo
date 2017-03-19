import { PRODUCT_LIST_SUCCESS, UPDATE_CHARITY_DONATION,
CHARITY_DONATION_FETCH_SUCCESS, UPDATE_PRODUCT_URLS } from '../actions/action-types';

const initialProductState = {
    productList: {},
    charityDonation: 0,
};

export default function(state = initialProductState, action) {
  switch(action.type) {
      case PRODUCT_LIST_SUCCESS:{
          return Object.assign({}, state, { productList: action.productList });
      }
      case CHARITY_DONATION_FETCH_SUCCESS:{
          return Object.assign({}, state, { charityDonation: action.charityDonation });
      }
      case UPDATE_CHARITY_DONATION:{
          const updatedDonation = action.charityDonationUpdate + state.charityDonation;
          return Object.assign({}, state, { charityDonation: updatedDonation });
      }
      case UPDATE_PRODUCT_URLS:{
          const productUrls = action.productUrls;
          const productListCopy = Object.assign({}, state.productList);
          for (var i = 0; i < productUrls.length; i++) {
              const url = productUrls[i];
              const key = url.split('.jpg')[0].split('tvx-0001%2F')[1];
              productListCopy[key].prodImg = url;
          }
          return Object.assign({}, state, { productList: productListCopy });
      }
      default: return state;
  }
}
