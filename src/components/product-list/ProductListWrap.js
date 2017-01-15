import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductList from './ProductList';
import UserApi from '../../api/user-api';

class ProductListWrap extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(product) {
        UserApi.addProductToBasket(this.props.user.uid, product, this.props.currentTeam);
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
    productList: store.productsReducer.productList,
    user: store.userReducer.user,
    currentTeam: store.userReducer.currentTeam,
  };
}

export default connect(mapStateToProps)(ProductListWrap);
