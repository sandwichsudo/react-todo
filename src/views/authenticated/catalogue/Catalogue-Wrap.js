import React, { Component } from 'react';
var firebase = require("firebase/app");
import Catalogue from './Catalogue';
import { browserHistory } from 'react-router';

class CatalogueWrap extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { products: [], text: '', loading: true, user: null };
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
        this.firebaseRef = firebase.database().ref(`products`);
        this.firebaseRef.on('value', (snapshot) => {
            const value = snapshot.val();
            if (value) {
                this.products = value;
                this.setState({
                    products: this.products
                });
            }
        });
    }

    componentWillUnmount() {
        if (this.firebaseRef) {
            this.firebaseRef.off();
        }
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
            const newItems = prevState.products.concat(newItem);
            this.firebaseRef.set(newItems);
            return {
                products: newItems,
                text: ''
            };
        });
    }

    render() {
        return (
            <Catalogue
                loading={this.state.loading}
                products={this.state.products}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                text={this.state.text}
                />
        );
    }
}

export default CatalogueWrap;
