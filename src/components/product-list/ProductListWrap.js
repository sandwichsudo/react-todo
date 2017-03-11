import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductList from './ProductList';
import UserApi from '../../api/user-api';

class ProductListWrap extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRestockRequest = this.handleRestockRequest.bind(this);
    }

    handleSubmit(product) {
        UserApi.addTransactionToHistory(this.props.user.uid, product,
            this.props.currentTeam, this.props.notificationTimer);
            console.log("this.props.notificationTimer", this.props.notificationTimer);
    }

    handleRestockRequest(product) {
        console.log(product);
        UserApi.upvoteRestock(this.props.user.uid, product, this.props.currentTeam);
    }


    render() {
        return (
            <ProductList
                productList={this.props.productList}
                handleSubmit={this.handleSubmit}
                handleRestockRequest={this.handleRestockRequest}
                />
        );
    }
}
const mapStateToProps = function(store) {
  return {
    productList: store.productsReducer.productList,
    user: store.userReducer.user,
    currentTeam: store.userReducer.currentTeam,
    notificationTimer: store.uiReducer.notificationTimer,
  };
}

export default connect(mapStateToProps)(ProductListWrap);
