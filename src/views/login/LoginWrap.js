import React, { Component } from 'react';
var firebase = require('firebase/app');
import userApi from '../../api/user-api';
import Login from './Login';

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
            console.log('componentWillMount getRedirectResult then', data);
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
        firebase.auth().signInWithRedirect(provider);
    }

    facebookLogin(e) {
        e.preventDefault();
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }

    emailPasswordLogin() {
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
