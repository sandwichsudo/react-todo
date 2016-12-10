import React, { Component } from 'react';
import { Link } from 'react-router';
// Components
import Header from '../header/Header.js';

class MainLayout extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <nav className="primary-aside">
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/catalogue">Catalogue</Link></li>
                  </ul>
                </nav>
                <main className="main-container">
                        {this.props.children}
                </main>
            </div>
        );
    }
}

export default MainLayout;
