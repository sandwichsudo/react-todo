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

    getKeyToRemove(id) {
        let key = '';
        for (let itemKey in this.props.user.items) {
            if (this.props.user.items.hasOwnProperty(itemKey)) {
                const item = this.props.user.items[itemKey];
                if (item.id.toString() === id) {
                    key = itemKey;
                }
            }
        }
        return key;
    }

    handleRemoveProduct(id) {
        UserApi.removeProductFromBasket(this.props.user.uid, this.getKeyToRemove(id));
    }

    clearTab() {
        UserApi.clearTab(this.props.total, this.props.user.uid);
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
    total: store.userReducer.total
  };
}

export default connect(mapStateToProps)(BasketWrap);
