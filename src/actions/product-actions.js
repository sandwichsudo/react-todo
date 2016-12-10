import { PRODUCT_LIST_SUCCESS, ADD_PRODUCT } from '../actions/action-types';

export function productListSuccess(productList) {
  return {
    type: PRODUCT_LIST_SUCCESS,
    productList
  };
}

export function productAddSuccess(newProduct) {
  return {
    type: ADD_PRODUCT,
    newProduct
  };
}
