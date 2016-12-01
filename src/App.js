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
firebase.initializeApp(config);

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { items: [], text: '' };
    }
    componentWillMount() {
        this.firebaseRef = firebase.database().ref('todo');
        this.firebaseRef.on('value', (snapshot) => {
          this.items = snapshot.val().items;
          this.setState({
              items: this.items
          });
        });
    }
    componentWillUnmount() {
        this.firebaseRef.off();
    }

    render() {
        return ( <
            div >
            <
            h1 > Warning!All users can see anything you write here! < /h1> <
            h3 > TODO < /h3> <
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
