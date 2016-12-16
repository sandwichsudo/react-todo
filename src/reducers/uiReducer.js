import {
    VIEW_LOADED,
    START_VIEW_LOADING,
    NEW_NOTIFICATION,
    CLOSE_NOTIFICATION
} from '../actions/action-types';

const initialUIState = {
  loading: true,
  notification: {},
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
      case NEW_NOTIFICATION:{
           let stateCopy = Object.assign({}, state);
           stateCopy.notification = action.notification;
           return stateCopy;
      }
      case CLOSE_NOTIFICATION:{
           let stateCopy = Object.assign({}, state);
           stateCopy.notification = initialUIState.notification;
           return stateCopy;
      }
      default: return state;
  }
}
