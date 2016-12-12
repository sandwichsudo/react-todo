import {
    VIEW_LOADED,
    START_VIEW_LOADING
} from '../actions/action-types';

const initialUIState = {
  loading: false
}

export default function(state = initialUIState, action) {
  switch(action.type) {
      case VIEW_LOADED:{
          let stateCopy = Object.assign({}, state);
          stateCopy.loading = false;
          return stateCopy;
      }
      case START_VIEW_LOADING:{
           let stateCopy = Object.assign({}, state);
           stateCopy.loading = true;
           return stateCopy;
      }
  }
  return state;
}
