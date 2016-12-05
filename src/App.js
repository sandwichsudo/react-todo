import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Basket from './views/authenticated/basket/Basket';
import './App.css';
var firebase = require("firebase/app");
// Components
import Header from './components/header/Header.js';

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { items: [], text: '' };
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.getInitialData(user.uid);
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
        return ( <
            div >
            <Header></Header>
            <h3 > TODO < /h3> <
            Basket items={ this.state.items }
            /> <
            form onSubmit={ this.handleSubmit } >
            <
            input onChange={ this.handleChange }
            value={ this.state.text }
            /> <
            button > { 'Add #' + (this.state.items.length + 1) } < /button> < /
            form > <
            /div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        var newItem = {
            text: this.state.text,
            id: Date.now()
        };

        this.setState((prevState) => {
            const newItems = prevState.items.concat(newItem);
            this.firebaseRef.set({ items: newItems });
            return {
                items: newItems,
                text: ''
            };
        });
    }
}

export default TodoApp;
