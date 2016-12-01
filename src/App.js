import React, { Component } from 'react';
import './App.css';

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { items: [], text: '' };
    }
    componentWillMount() {
        this.firebaseRef = new Firebase("https://ReactFireTodoApp.firebaseio.com/items/"); //eslint-disable-line no-undef
        this.firebaseRef.on("child_added", function(dataSnapshot) {
            this.items.push(dataSnapshot.val());
            this.setState({
                items: this.items
            });
        }.bind(this));
    }
    componentWillUnmount() {
        this.firebaseRef.off();
    }

    render() {
        return ( <
            div >
            <h1>Warning! All users can see anything you write here!</h1>
            <
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
        this.firebaseRef.push({
            text: this.state.text
        });
        this.setState({ text: "" });
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
