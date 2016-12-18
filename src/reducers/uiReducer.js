import {
    VIEW_LOADED,
    START_VIEW_LOADING,
    NEW_NOTIFICATION,
    CLOSE_NOTIFICATION,
    ROUTE_CHANGE,
    TOGGLE_PROFILE_MENU
} from '../actions/action-types';

const initialUIState = {
  loading: true,
  notification: {},
  title: 'Tuck Shop',
  profileMenuOpen: false
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
      case ROUTE_CHANGE: {
          let stateCopy = Object.assign({}, state);
          stateCopy.title = action.title;
          return stateCopy;
      }
      case TOGGLE_PROFILE_MENU: {
          let stateCopy = Object.assign({}, state);
          stateCopy.profileMenuOpen = !state.profileMenuOpen;
          return stateCopy;
      }
      default: return state;
  }
}
