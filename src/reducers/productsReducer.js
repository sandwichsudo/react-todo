import { PRODUCT_LIST_SUCCESS, ADD_PRODUCT } from '../actions/action-types';

const initialProductState = {};

export default function(state = initialProductState, action) {
  switch(action.type) {
      case PRODUCT_LIST_SUCCESS:{
          const hasList = !!state.productList;
          let productListCopy = {};
          if (hasList) {
              productListCopy = state.productList ? Object.assign({}, state.productList) : initialProductState;
          }
          productListCopy = Object.assign(productListCopy, action.productList);
          return Object.assign({}, state, { productList: productListCopy });
      }
      case ADD_PRODUCT: {
          const hasList = !!state.productList;
          let index = 0;
          let productListCopy = {};
          if (hasList) {
              productListCopy = state.productList ? Object.assign({}, state.productList) : initialProductState;
              index = Object.keys(state.productList).length;
          }
          productListCopy[index] = action.newProduct;
          return Object.assign({}, state, { productList: productListCopy } );
      }
      default: return state;
  }
}
