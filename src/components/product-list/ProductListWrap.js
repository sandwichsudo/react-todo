import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductList from './ProductList';

class ProductListWrap extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(product) {
        console.log('Adding product', product);
    }

    render() {
        return (
            <ProductList
                productList={this.props.productList}
                handleSubmit={this.handleSubmit}
                />
        );
    }
}
const mapStateToProps = function(store) {
  return {
    productList: store.productsReducer.productList
  };
}

export default connect(mapStateToProps)(ProductListWrap);
