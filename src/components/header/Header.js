import React, { Component } from 'react';
var firebase = require("firebase/app");
import { browserHistory } from 'react-router';

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
        return ( <header>
                <button onClick={this.logout}>Logout</button>
            </header> );
    }
}

export default Header;
