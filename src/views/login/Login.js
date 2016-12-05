import React, { Component } from 'react';
var firebase = require("firebase/app");
import { browserHistory } from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.googleLogin = this.googleLogin.bind(this);
        this.facebookLogin = this.facebookLogin.bind(this);
        this.state = { usualProvider: 'something' };
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
        firebase.auth().getRedirectResult().catch((error) => {
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
            <div className="loader">Loading</div>
            <h2>You usually use {this.state.usualProvider} to log in.</h2>

             </form>
        );
    }
}

export default Login;
