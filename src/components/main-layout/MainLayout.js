import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import store from '../../reducers/store';
import { connect } from 'react-redux';
// Components
import Header from '../header/Header.js';
var firebase = require("firebase/app");

class MainLayout extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged((userOb) => {
            if (userOb) {
                this.firebaseRef = firebase.database().ref(`users/${userOb.uid}`);
                this.firebaseRef.on('value', (snapshot) => {
                    const user = snapshot.val();
                    if (user) {
                        let modifiedUserOb = Object.assign({}, userOb);
                        modifiedUserOb.displayName = modifiedUserOb.displayName.split(' ')[0];
                        store.dispatch({
                          type: 'USER_AUTH_SUCCESS',
                          user: {...user, ...modifiedUserOb}
                        });
                    }
                });

            } else {
                browserHistory.push('/login')
            }
        });
    }

    componentWillUnmount() {
        if (this.firebaseRef) {
            this.firebaseRef.off();
        }
    }

    render() {
        return (
            <div>
                <Header></Header>
                <nav className="primary-aside">
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/catalogue">Catalogue</Link></li>
                  </ul>
                </nav>
                <main className="main-container">
                    {this.props.children}
                </main>
            </div>
        );
    }
}

const mapStateToProps = function(store) {
  return {
    user: store.userReducer.user
  };
}

export default connect(mapStateToProps)(MainLayout);
