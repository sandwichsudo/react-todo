import { ADD_PRODUCT_TO_BASKET_SUCCESS } from '../actions/action-types';

export function addProductToBasketSuccess(newProduct) {
  return {
    type: ADD_PRODUCT_TO_BASKET_SUCCESS,
    newProduct
  };
}
