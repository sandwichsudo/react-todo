import { PRODUCT_LIST_SUCCESS, CHARITY_DONATION_FETCH_SUCCESS,
    UPDATE_CHARITY_DONATION, UPDATE_PRODUCT_URLS } from '../actions/action-types';

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
export function updateProductUrls(productUrls) {
    return {
      type: UPDATE_PRODUCT_URLS,
      productUrls
    };
}
