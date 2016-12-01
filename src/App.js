import React, { Component } from 'react';
import './App.css';
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDRO1DrTTjbCBoHHPdTBOZovnBccF-VTxc",
    authDomain: "react-todo-7e0a3.firebaseapp.com",
    databaseURL: "https://react-todo-7e0a3.firebaseio.com",
    storageBucket: "react-todo-7e0a3.appspot.com",
    messagingSenderId: "525493460858"
};
var app = firebase.initializeApp(config);

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { items: [], text: '' };
    }
    componentWillMount() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            this.firebaseRef = app.database().ref(`users/${user.uid}`);
            this.firebaseRef.on('value', (snapshot) => {
                const value = snapshot.val();
                if (value && value.items) {
                    this.items = value.items;
                    this.setState({
                        items: this.items
                    });
                }
            });
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.error(error);
        });

    }
    componentWillUnmount() {
        this.firebaseRef.off();
    }

    render() {
        return ( <
            div >
            <h3 > TODO < /h3> <
            TodoList items = { this.state.items }
            /> <
            form onSubmit = { this.handleSubmit } >
            <
            input onChange = { this.handleChange }
            value = { this.state.text }
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

class TodoList extends Component {
    render() {
        return ( <
            ul > {
                this.props.items.map(item => ( <
                    li key = { item.id } > { item.text } < /li>
                ))
            } <
            /ul>
        );
    }
}

export default TodoApp;
