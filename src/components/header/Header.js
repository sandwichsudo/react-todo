import React, { Component } from 'react';
import { Link } from 'react-router';
import Coffee from 'react-icons/io/coffee';
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
                 <Link to="/" className="home-link"><h1 className="app-title"><Coffee className="icon" />
                 <span className="app-title-text">TuckShop</span></h1></Link>
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
    user: store.userReducer.user
  };
}

export default connect(mapStateToProps)(Header);
