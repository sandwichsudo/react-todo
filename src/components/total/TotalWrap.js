import React, { Component } from 'react';
import { connect } from 'react-redux';

import Total from './Total';

class TotalWrap extends Component {
    render() {
        return (
            <Total
                productList={this.props.productList}
                balance={this.props.balance}
                />
        );
    }
}

const mapStateToProps = function(store) {
  return {
    productList: store.productsReducer.productList,
    balance: store.userReducer.balance,
  };
}

export default connect(mapStateToProps)(TotalWrap);
