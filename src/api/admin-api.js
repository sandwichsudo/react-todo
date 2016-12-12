var firebase = require('firebase/app');
import store from '../store';
import { usersListSuccess } from '../actions/admin-actions';

export default {
    getUsers: () => {
        let firebaseRef = firebase.database().ref().child('users');
        return firebaseRef.once('value').then(response => {
            store.dispatch(usersListSuccess(response.val()));
            return response.val();
        });
    }
}
