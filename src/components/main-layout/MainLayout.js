import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import UserApi from '../../api/user-api';
// Components
import Header from '../header/Header.js';
import LoaderWrap from '../loader/LoaderWrap.js';
import NotificationWrap from '../notification/NotificationWrap.js';

class MainLayout extends Component {
    componentDidMount() {
        UserApi.onAuth();
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
                        <Header/>
                        <main className="main-container">
                            <div className={ this.props.loading ? "hidden" : ""}>
                                    {this.props.user.email &&
                                        <nav className="primary-aside">
                                          <ul>
                                            <li><Link to="/tab">Tab</Link></li>
                                            <li><Link to="/shop">Shop</Link></li>
                                            {this.props.user.isAdmin && <li><Link to="/admin">Admin</Link></li> }
                                          </ul>
                                        </nav>
                                    }
                                    {this.props.children}
                            </div>
                            <NotificationWrap/>
                        </main>
                    </div>
                }
                {!this.props.user.email &&
                    <div>
                        <main className={"login-screen "+(this.props.loading ? "hidden" : "")}>
                            {this.props.children}
                        </main>
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
  };
}

export default connect(mapStateToProps)(MainLayout);
