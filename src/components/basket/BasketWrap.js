import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserApi from '../../api/user-api';
import Basket from './Basket';

class BasketWrap extends Component {
    constructor(props) {
        super(props);
        this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    }

    handleRemoveProduct(key) {
        UserApi.removeProductFromBasket(this.props.user.uid, key);
    }

    render() {
        return (
            <Basket
                items={this.props.user.items}
                handleRemoveProduct={this.handleRemoveProduct}
                />
        );
    }
}
const mapStateToProps = function(store) {
  return {
    productList: store.productsReducer.productList,
    user: store.userReducer.user,
  };
}

export default connect(mapStateToProps)(BasketWrap);
