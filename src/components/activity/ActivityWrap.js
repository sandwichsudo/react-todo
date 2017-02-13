import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserApi from '../../api/user-api';
import Activity from './Activity';

class ActivityWrap extends Component {
    constructor(props) {
        super(props);
        this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    }

    handleRemoveProduct(id) {
        const product = this.props.user.teams[this.props.currentTeam].transactionHistory[id];
        UserApi.removeTransactionFromHistory(this.props.user.uid, id,
            this.props.currentTeam, product.value, product.label);
    }

    render() {
        return (
            <Activity
                items={this.props.user.concatedItems}
                handleRemoveProduct={this.handleRemoveProduct}
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

export default connect(mapStateToProps)(ActivityWrap);
