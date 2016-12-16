import React, { Component } from 'react';
var firebase = require('firebase/app');
import userApi from '../../api/user-api';
import Login from './Login';
import UiApi from '../../api/ui-api';

class LoginWrap extends Component {
    constructor(props) {
        super(props);
        this.googleLogin = this.googleLogin.bind(this);
        this.facebookLogin = this.facebookLogin.bind(this);
        this.state = { usualProvider: ''};
    }

    componentWillMount() {
        firebase.auth().getRedirectResult().then(() => {
            // if user is logged in we will be redirected soon
            if (firebase.auth().currentUser) {
                UiApi.startLoading();
            } else {
                UiApi.loaded();
            }
        }).catch((error) => {
          console.error(error);
          UiApi.loaded();
          firebase.auth().fetchProvidersForEmail(error.email).then((emails) => {
              const usualEmail = emails[0];
              const account = usualEmail.indexOf('google.com') > -1 ? 'Google' : 'Facebook';
              this.setState({ usualProvider: account });
          });
        });
    }

    googleLogin(e) {
        e.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
        UiApi.startLoading();
        firebase.auth().signInWithRedirect(provider);
    }

    facebookLogin(e) {
        e.preventDefault();
        UiApi.startLoading();

        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }

    emailPasswordLogin() {
        UiApi.startLoading();

        const email = `test.${Date.now()}@gmail.com`;
        const password = 'Password!'
        userApi.createUserFromPassword(email, password);
    }

    componentWillUnmount() {
        this.fireBaseListener && this.fireBaseListener();
    }

    render() {
        return (
            <Login
                emailPasswordLogin={this.emailPasswordLogin}
                usualProvider={this.state.usualProvider}
                googleLogin={this.googleLogin}
                facebookLogin={this.facebookLogin}
            />
        );
    }
}

export default LoginWrap;
