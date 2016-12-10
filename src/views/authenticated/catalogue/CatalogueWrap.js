import React, { Component } from 'react';
import Catalogue from './Catalogue';
import { connect } from 'react-redux';
import ProductsApi from '../../../api/products-api';

class CatalogueWrap extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { text: '' };
    }

    componentDidMount() {
       ProductsApi.getProducts();
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

        ProductsApi.addProduct(newItem);
        this.setState((prevState) => {
            return {
                text: ''
            };
        });
    }

    render() {
        return (
            <Catalogue
                productList={this.props.productList}
                user={this.props.user}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                text={this.state.text}
                />
        );
    }
}
const mapStateToProps = function(store) {
  return {
     productList: store.productsReducer.productList,
     user: store.userReducer.user
  };
}

export default connect(mapStateToProps)(CatalogueWrap);
