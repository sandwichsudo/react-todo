import React, { Component } from 'react';
var firebase = require("firebase/app");
import { browserHistory } from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.googleLogin = this.googleLogin.bind(this);
        this.facebookLogin = this.facebookLogin.bind(this);
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("user in onAuthStateChanged", user);
                browserHistory.push('/')
            }
        }, (err) => {
            console.error(err);
        });
        firebase.auth().getRedirectResult().catch(function(error) {
          console.error(error);
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

    render() {
        return (
            <form>
            <h1>Login or sign up</h1>
            <label>
            Username
            <input/>
            </label>
            <label>
            Password
            <input/>
            </label>
            <button type="submit">Continue</button>
            <button onClick={this.googleLogin}>Login with google</button>
            <button onClick={this.facebookLogin}>Login with facebook</button>

            </form>
        );
    }
}

export default Login;
