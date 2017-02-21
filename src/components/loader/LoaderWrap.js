import React, { Component } from 'react';
import { connect } from 'react-redux';

import CupLoader from './CupLoader';
import InlineLoader from './InlineLoader';

class LoaderWrap extends Component {
    render() {
        return (
            <div>
                { this.props.inlineLoader && <InlineLoader
                loading={this.props.loading}
                />}
                { !this.props.inlineLoader && <CupLoader
                loading={this.props.loading}
                /> }
            </div>
        );
    }
}
const mapStateToProps = function(store) {
  return {
    loading: store.uiReducer.loading
  };
}

export default connect(mapStateToProps)(LoaderWrap);
