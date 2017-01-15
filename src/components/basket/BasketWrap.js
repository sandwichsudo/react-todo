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
        let items = this.props.user.teams[this.props.currentTeam].items;
        for (let itemKey in items) {
            if (items.hasOwnProperty(itemKey)) {
                const item = items[itemKey];
                if (item.id.toString() === id) {
                    key = itemKey;
                }
            }
        }
        return key;
    }

    handleRemoveProduct(id) {
        UserApi.removeProductFromBasket(this.props.user.uid, this.getKeyToRemove(id), this.props.currentTeam);
    }

    clearTab() {
        UserApi.clearTab(this.props.total, this.props.user.uid, this.props.currentTeam);
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
    total: store.userReducer.total,
    currentTeam: store.userReducer.currentTeam
  };
}

export default connect(mapStateToProps)(BasketWrap);
