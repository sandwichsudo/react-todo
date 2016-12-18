import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserApi from '../../api/user-api';
import Basket from './Basket';

class BasketWrap extends Component {
    constructor(props) {
        super(props);
        this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
        this.clearTab = this.clearTab.bind(this);

    }

    handleRemoveProduct(key) {
        UserApi.removeProductFromBasket(this.props.user.uid, key);
    }

    clearTab() {
        UserApi.clearTab(this.props.total, this.props.user.uid);
    }

    render() {
        return (
            <Basket
                items={this.props.user.items}
                handleRemoveProduct={this.handleRemoveProduct}
                clearTab={this.clearTab}
                />
        );
    }
}
const mapStateToProps = function(store) {
  return {
    productList: store.productsReducer.productList,
    user: store.userReducer.user,
    total: store.userReducer.total
  };
}

export default connect(mapStateToProps)(BasketWrap);
