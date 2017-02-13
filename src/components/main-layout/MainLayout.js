import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import UserApi from '../../api/user-api';
// Components
import HeaderWrap from '../header/HeaderWrap.js';
import LoaderWrap from '../loader/LoaderWrap.js';
import MenuWrap from '../menu/MenuWrap.js';
import NotificationWrap from '../notification/NotificationWrap.js';

class MainLayout extends Component {
    componentDidMount() {
        console.log('inside componentDidMount of MainLayout');
        if (this.props.user && this.props.user.email) {
            // go to /shop
            console.log('this.props.user.email is truthy, we have a user, doing nothing');
        } else {
            console.log('this.props.user.email is falsey, calling UserApi.onAuth');
            UserApi.onAuth();
        }
    }

    // TODO: do something about this!
    // componentWillUnmount() {
    //     if (this.firebaseRef) {
    //         this.firebaseRef.off();
    //     }
    // }

    render() {
        return (
            <div>
                <LoaderWrap/>
                {this.props.user.email &&
                    <div>
                        { this.props.profileMenuOpen && <MenuWrap></MenuWrap>}
                        <div className={this.props.profileMenuOpen ? "masked" : ""}>
                            <HeaderWrap/>
                            <main>
                                <div className={ this.props.loading ? "hidden" : ""}>
                                        {this.props.user.email &&
                                            <nav className="primary-aside">
                                              <ul>
                                                <li><Link to="/activity" activeClassName="active">Activity</Link></li>
                                                <li><Link to="/shop" activeClassName="active">Shop</Link></li>
                                                {this.props.user.isAdmin && <li><Link to="/admin" activeClassName="active">Admin</Link></li> }
                                              </ul>
                                            </nav>
                                        }
                                        {this.props.children}
                                </div>
                                <div className="main-container">
                                    <NotificationWrap />
                                </div>
                            </main>
                        </div>
                    </div>
                }
                {!this.props.user.email &&
                    <div>
                        <main className={"login-screen "+(this.props.loading ? "hidden" : "")}>
                            {this.props.children}
                        </main>
                        <div className="main-container">
                            <NotificationWrap />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = function(store) {
  return {
    user: store.userReducer.user,
    loading: store.uiReducer.loading,
    profileMenuOpen: store.uiReducer.profileMenuOpen,
  };
}

export default connect(mapStateToProps)(MainLayout);
