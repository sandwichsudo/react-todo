import React, { Component } from 'react';
var firebase = require('firebase/app');
import { browserHistory } from 'react-router';
import userApi from '../../api/user-api';
import Login from './Login';

class LoginWrap extends Component {
    constructor(props) {
        super(props);
        this.googleLogin = this.googleLogin.bind(this);
        this.facebookLogin = this.facebookLogin.bind(this);
        this.state = { usualProvider: '', loading: true };
    }

    componentWillMount() {
        firebase.auth().getRedirectResult().then((data) => {
            console.log(data);
        }).catch((error) => {
          console.error(error);
          firebase.auth().fetchProvidersForEmail(error.email).then((emails) => {
              console.log(emails);
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
        const email = 'gilly.ames@travelex.com';
        const password = 'Password!'
        userApi.createUserFromPassword(email, password);
    }

    componentWillUnmount() {
        this.fireBaseListener && this.fireBaseListener();
    }

    render() {
        return (
            <Login
                loading={this.state.loading}
                emailPasswordLogin={this.emailPasswordLogin}
                usualProvider={this.usualProvider}
                googleLogin={this.googleLogin}
                facebookLogin={this.facebookLogin}
            />
        );
    }
}

export default LoginWrap;
