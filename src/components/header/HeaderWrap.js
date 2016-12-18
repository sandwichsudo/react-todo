import React, { Component } from 'react';
import { connect } from 'react-redux';
import UiApi from '../../api/ui-api';
import Header from './Header';

class HeaderWrap extends Component {

    onProfileClicked() {
        UiApi.onToggleProfileMenu();
    }

    render() {
        return (
            <Header
                user={this.props.user}
                title={this.props.title}
                onProfileClicked={this.onProfileClicked}
            ></Header>
        );
    }
}

const mapStateToProps = function(store) {
  return {
      user: store.userReducer.user,
      title: store.uiReducer.title,
  };
}

export default connect(mapStateToProps)(HeaderWrap);
