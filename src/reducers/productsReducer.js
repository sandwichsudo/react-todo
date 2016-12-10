import { PRODUCT_LIST_SUCCESS, ADD_PRODUCT } from '../actions/action-types';

const initialProductState = {
    productList: []
}

export default function(state = initialProductState, action) {
  switch(action.type) {
      case PRODUCT_LIST_SUCCESS:
        return Object.assign({}, state, { productList: action.productList });
      case ADD_PRODUCT: {
          let productListCopy = state.productList ? Object.assign({}, state.productList) : initialProductState;
          productListCopy[Object.keys(state.productList).length] = action.newProduct;
          return Object.assign({}, state, { productList: productListCopy } );
      }
  }
  return state;
}
