import React, { Component } from 'react';
import Filters from './Filters';
import { connect } from 'react-redux';

class FiltersWrap extends Component {
    render() {
        return (
            <Filters
            />
        );
    }
}

const mapStateToProps = function(store) {
  return {
    user: store.userReducer.user,
    currentTeam: store.userReducer.currentTeam
  };
}

export default connect(mapStateToProps)(FiltersWrap);
