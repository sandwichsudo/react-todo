import React, { Component } from 'react';
import { connect } from 'react-redux';
import UiApi from '../../api/ui-api';
import UserApi from '../../api/user-api';

import Menu from './Menu';

class MenuWrap extends Component {
    onCloseButtonClicked() {
        UiApi.onToggleProfileMenu();
    }

    onLogoutClicked() {
        UserApi.logout();
        UiApi.onToggleProfileMenu();
    }

    render() {
        return (
            <Menu
                onLogoutClicked={this.onLogoutClicked}
                onCloseButtonClicked={this.onCloseButtonClicked}
            />
        );
    }
}

const mapStateToProps = function(store) {
  return {
    profileMenuOpen: store.uiReducer.profileMenuOpen
  };
}

export default connect(mapStateToProps)(MenuWrap);
