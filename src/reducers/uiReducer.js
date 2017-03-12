import {
    VIEW_LOADED,
    START_VIEW_LOADING,
    NEW_NOTIFICATION,
    CLOSE_NOTIFICATION,
    ROUTE_CHANGE,
    TOGGLE_PROFILE_MENU,
    STOP_LOADING_ITEM,
    START_LOADING_ITEM,
    TOGGLE_SHOW_OLDER_ITEMS,
    CLOSE_PROFILE_MENU,
} from '../actions/action-types';

const initialUIState = {
  loading: true,
  inlineLoading: new Set(),
  notification: {},
  title: 'Tuck Shop',
  profileMenuOpen: false,
  notificationTimer: null,
  showOlderItems: false,
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
      case STOP_LOADING_ITEM:{
          let inlineLoadingCopy = new Set(state.inlineLoading);
          //console.log('In stop Loading items:', stateCopy.inlineLoading);

          inlineLoadingCopy.delete(action.key);
          return { ...state, inlineLoading: inlineLoadingCopy};
      }
      case START_LOADING_ITEM:{
          let inlineLoadingCopy = new Set(state.inlineLoading);

          // console.log('in Loading items:', stateCopy.inlineLoading);
           inlineLoadingCopy.add(action.key);
           return { ...state, inlineLoading: inlineLoadingCopy};
      }
      case NEW_NOTIFICATION:{
           let stateCopy = Object.assign({}, state);
           stateCopy.notification = action.notification;
           stateCopy.notificationTimer = action.notificationTimer;
           console.log('stateCopy', stateCopy);
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
      case CLOSE_PROFILE_MENU: {
          let stateCopy = Object.assign({}, state);
          stateCopy.profileMenuOpen = false;
          return stateCopy;
      }
      case TOGGLE_SHOW_OLDER_ITEMS: {
          let stateCopy = Object.assign({}, state);
          stateCopy.showOlderItems = !state.showOlderItems;
          return stateCopy;
      }
      default: return state;
  }
}
