import { PRODUCT_LIST_SUCCESS, UPDATE_CHARITY_DONATION,
CHARITY_DONATION_FETCH_SUCCESS } from '../actions/action-types';

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
      default: return state;
  }
}
