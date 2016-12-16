import React, { Component } from 'react';
import { Link } from 'react-router';
import MdAccountCircle from 'react-icons/md/account-circle';
import { connect } from 'react-redux';
import UserApi from '../../api/user-api';

class Header extends Component {
    logout() {
        UserApi.logout();
    }

    render() {
        return (
            <header className="header">
                 <h1 className="app-title">
                 <span className="app-title-text">{ this.props.title }</span></h1>
                 { this.props.user.displayName &&
                     <button className="button header-button" onClick={this.logout}>
                         Logout
                         { !this.props.user.photoURL && <MdAccountCircle
                             className="profile-photo"
                             /> }
                         { this.props.user.photoURL && <img
                             className="profile-photo"
                             alt="account profile"
                             src={this.props.user.photoURL}/> }
                     </button>
                 }
            </header> );
    }
}

const mapStateToProps = function(store) {
  return {
    user: store.userReducer.user,
    title: store.uiReducer.title,
  };
}

export default connect(mapStateToProps)(Header);
