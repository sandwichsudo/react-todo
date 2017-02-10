import React, { Component } from 'react';
import { browserHistory } from 'react-router';
var firebase = require('firebase/app');
import userApi from '../../api/user-api';
import Login from './Login';
import UiApi from '../../api/ui-api';
import { connect } from 'react-redux';

class LoginWrap extends Component {
    constructor(props) {
        super(props);
        this.googleLogin = this.googleLogin.bind(this);
        this.facebookLogin = this.facebookLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.emailPasswordLogin = this.emailPasswordLogin.bind(this);
        this.state = { usualProvider: '', password: '', email: '' };
    }

    componentWillMount() {
        console.log('Inside componentWillMount in LoginWrap');
        //check for user in store
        if (this.props.user && this.props.user.email) {
            // go to /shop
            console.log('this.props.user.email is truthy, going to shop');
            browserHistory.push('/');
        } else {
            console.log('User email not truthy, checking auth for redirect result');
            firebase.auth().getRedirectResult().then(() => {
                console.log('Inside getRedirectResult then');
                // if user is logged in we will be redirected soon
                if (firebase.auth().currentUser) {
                    console.log('firebase.auth().currentUser is truthy');
                //    UiApi.startLoading();
                } else {
                    console.log('firebase.auth().currentUser is falsey');
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

    emailPasswordLogin(e) {
        e.preventDefault();
        UiApi.startLoading();
        userApi.createUserFromPassword(this.state.email, this.state.password);
    }

    componentWillUnmount() {
        this.fireBaseListener && this.fireBaseListener();
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <Login
                emailPasswordLogin={this.emailPasswordLogin}
                usualProvider={this.state.usualProvider}
                googleLogin={this.googleLogin}
                facebookLogin={this.facebookLogin}
                handlePasswordChange={this.handlePasswordChange}
                handleEmailChange={this.handleEmailChange}
                password={this.state.password}
                email={this.state.email}
            />
        );
    }
}

const mapStateToProps = function(store) {
  return {
    user: store.userReducer.user,
  };
}

export default connect(mapStateToProps)(LoginWrap);
