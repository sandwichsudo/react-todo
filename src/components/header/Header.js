import React, { Component } from 'react';
var firebase = require("firebase/app");
import { browserHistory } from 'react-router';
import Coffee from 'react-icons/io/coffee';

class Header extends Component {
    logout() {
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
          browserHistory.push('/login');
      }, (error) => {
          console.error(error);
        });
    }

    render() {
        return (
            <header className="header">
                 <h1 className="app-title"><Coffee className="icon" />
                 <span className="app-title-text">TuckShop</span></h1>
                 { this.props.user && <button className="button header-button" onClick={this.logout}>Logout {this.props.user.displayName.split(' ')[0]}</button> }
            </header> );
    }
}

export default Header;
