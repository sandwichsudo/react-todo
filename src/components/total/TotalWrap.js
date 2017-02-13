import React, { Component } from 'react';
import { connect } from 'react-redux';

import Total from './Total';

class TotalWrap extends Component {
    render() {
        return (
            <Total
                productList={this.props.productList}
                balance={this.props.user.teams ? this.props.user.teams['tvx-0001'].balance : 0}
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

export default connect(mapStateToProps)(TotalWrap);
