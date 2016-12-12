import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from './Loader';

class LoaderWrap extends Component {
    render() {
        return (
            <Loader
                loading={this.props.loading}
                />
        );
    }
}
const mapStateToProps = function(store) {
  return {
    loading: store.uiReducer.loading
  };
}

export default connect(mapStateToProps)(LoaderWrap);
