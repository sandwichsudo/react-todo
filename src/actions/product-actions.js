import { PRODUCT_LIST_SUCCESS, CHARITY_DONATION_FETCH_SUCCESS,
    UPDATE_CHARITY_DONATION } from '../actions/action-types';

export function productListSuccess(productList) {
  return {
    type: PRODUCT_LIST_SUCCESS,
    productList
  };
}
export function fetchCharityDonationSuccess(charityDonation) {
    return {
      type: CHARITY_DONATION_FETCH_SUCCESS,
      charityDonation
    };
}
export function updateCharityDonation(charityDonationUpdate) {
    return {
      type: UPDATE_CHARITY_DONATION,
      charityDonationUpdate
    };
}
