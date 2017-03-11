import { PRODUCT_LIST_SUCCESS } from '../actions/action-types';

export function productListSuccess(productList) {
  return {
    type: PRODUCT_LIST_SUCCESS,
    productList
  };
}
