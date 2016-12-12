import React, { Component } from 'react';
import Coffee from 'react-icons/io/coffee';
import { connect } from 'react-redux';
import UserApi from '../../api/user-api';

class Header extends Component {
    logout() {
        UserApi.logout();
    }

    render() {
        return (
            <header className="header">
                 <h1 className="app-title"><Coffee className="icon" />
                 <span className="app-title-text">TuckShop</span></h1>
                 { this.props.user.displayName &&
                     <button className="button header-button" onClick={this.logout}>
                         Logout <img className="profile-photo" alt="profile photo" src={this.props.user.photoURL}/>{this.props.user.photoUrl}
                     </button>
                 }
            </header> );
    }
}

const mapStateToProps = function(store) {
  return {
    user: store.userReducer.user
  };
}

export default connect(mapStateToProps)(Header);
