import { PRODUCT_LIST_SUCCESS } from '../actions/action-types';

const initialProductState = {};

export default function(state = initialProductState, action) {
  switch(action.type) {
      case PRODUCT_LIST_SUCCESS:{
          return Object.assign({}, state, { productList: action.productList });
      }
      default: return state;
  }
}
