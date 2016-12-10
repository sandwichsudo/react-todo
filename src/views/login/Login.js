import React, { Component } from 'react';
var firebase = require("firebase/app");
import { browserHistory } from 'react-router';
import FaFacebookOfficial from 'react-icons/fa/facebook-official';
import FaGooglePlusSquare from 'react-icons/fa/google-plus-square';

class Login extends Component {
    constructor(props) {
        super(props);
        this.googleLogin = this.googleLogin.bind(this);
        this.facebookLogin = this.facebookLogin.bind(this);
        this.state = { usualProvider: '', loading: true };
    }

    componentWillMount() {
        this.fireBaseListener = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("user in onAuthStateChanged", user);
                browserHistory.push('/')
            } else {
                  this.setState({ loading: false });
            }
        }, (err) => {
            console.error(err);
        });
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

    componentWillUnmount() {
        this.fireBaseListener && this.fireBaseListener();
    }

    render() {
        return (
            <div>
                {!this.state.loading &&
                <form>
                <h2>Login or sign up</h2>
                    <label>
                        <span className="label">Email</span>
                        <input className="input"/>
                    </label>
                    <label>
                        <span className="label">Password</span>
                        <input type="password" className="input"/>
                    </label>
                    <div className="button-wrap">
                        <button type="submit" className="primary-button">Continue</button>
                        <button className="social-button" title="Login with Google" onClick={this.googleLogin}><FaGooglePlusSquare className="icon"></FaGooglePlusSquare></button>
                        <button className="social-button" title="Login with Facebook" onClick={this.facebookLogin}><FaFacebookOfficial className="icon"></FaFacebookOfficial></button>
                    </div>
                    {this.state.usualProvider && <h3>Hmm.. looks like you usually log in with {this.state.usualProvider}. Why not use that instead?</h3>}
                 </form>}
                 {this.state.loading && <div className="loader">Loading</div>}
             </div>
        );
    }
}

export default Login;
