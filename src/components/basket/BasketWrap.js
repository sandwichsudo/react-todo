import React, { Component } from 'react';
import { connect } from 'react-redux';

import Basket from './Basket';

class BasketWrap extends Component {
    render() {
        return (
            <Basket
                productList={this.props.productList}
                items={this.props.user.items}
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
