import React, { Component } from 'react';
import { connect } from 'react-redux';

import Total from './Total';

class TotalWrap extends Component {
    render() {
        return (
            <Total
                productList={this.props.productList}
                total={this.props.total}
                />
        );
    }
}

const mapStateToProps = function(store) {
  return {
    productList: store.productsReducer.productList,
    total: store.userReducer.total
  };
}

export default connect(mapStateToProps)(TotalWrap);
