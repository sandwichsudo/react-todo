import React, { Component } from 'react';
var firebase = require('firebase/app');
import userApi from '../../api/user-api';
import Login from './Login';
import UserApi from '../../api/user-api';

class LoginWrap extends Component {
    constructor(props) {
        super(props);
        this.googleLogin = this.googleLogin.bind(this);
        this.facebookLogin = this.facebookLogin.bind(this);
        this.state = { usualProvider: ''};
    }

    componentWillMount() {
        console.log('componentWillMount');
        firebase.auth().getRedirectResult().then((data) => {
            console.log('componentWillMount getRedirectResult then', data.user);
            if (data.user) {
                UserApi.startLoading();
            } else {
                UserApi.loaded();
            }
        }).catch((error) => {
          console.error(error);
          firebase.auth().fetchProvidersForEmail(error.email).then((emails) => {
              this.setState({ usualProvider: emails[0] });
          });
        });
    }

    googleLogin(e) {
        e.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
        UserApi.startLoading();
        firebase.auth().signInWithRedirect(provider);
    }

    facebookLogin(e) {
        e.preventDefault();
        UserApi.startLoading();

        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }

    emailPasswordLogin() {
        UserApi.startLoading();

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
                usualProvider={this.usualProvider}
                googleLogin={this.googleLogin}
                facebookLogin={this.facebookLogin}
            />
        );
    }
}

export default LoginWrap;
