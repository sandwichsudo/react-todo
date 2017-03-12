import React, { Component } from 'react';
import { connect } from 'react-redux';

import CharityBalance from './CharityBalance';

class CharityBalanceWrap extends Component {
    render() {
        return (
            <CharityBalance
                charityBalance={this.props.charityBalance}
                />
        );
    }
}

const mapStateToProps = function(store) {
  return {
    charityBalance: store.productsReducer.charityDonation,
  };
}

export default connect(mapStateToProps)(CharityBalanceWrap);
