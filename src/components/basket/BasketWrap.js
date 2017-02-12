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

    handleRemoveProduct(id) {
        const product = this.props.user.teams[this.props.currentTeam].transactionHistory[id];
        UserApi.removeProductFromBasket(this.props.user.uid, id,
            this.props.currentTeam, product.value, product.label);
    }

    clearTab() {
    //    UserApi.clearTab(this.props.total, this.props.user.uid, this.props.currentTeam);
    }

    render() {
        return (
            <Basket
                items={this.props.user.concatedItems}
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
    currentTeam: store.userReducer.currentTeam
  };
}

export default connect(mapStateToProps)(BasketWrap);
