import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Basket from './views/authenticated/basket/Basket';
import './App.scss';
var firebase = require("firebase/app");
// Components

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, user: null, items: [] };
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.getInitialData(user.uid);
                this.setState({ user, loading: false });
            } else {
                browserHistory.push('/login')
            }
        });
    }

    getInitialData(uid) {
        this.firebaseRef = firebase.database().ref(`users/${uid}`);
        this.firebaseRef.on('value', (snapshot) => {
            const value = snapshot.val();
            if (value && value.items) {
                this.items = value.items;
                this.setState({
                    items: this.items
                });
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
                {this.state.loading && <div className="loader">Loading</div>}
                {!this.state.loading && <main className="main-container">
                    <h2>You have chosen the following items:</h2>
                    <Basket items={ this.state.items }/>
                </main>}
            </div>
        );
    }
}

export default TodoApp;
