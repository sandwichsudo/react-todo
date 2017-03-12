import React from 'react';
import MdClose from 'react-icons/md/close';
import { Link } from 'react-router';
// Using "Stateless Functional Components"
export default function(props) {
    return (
        <nav className="profile-nav">
            <button
                className="close-button"
                aria-label="Close"
                onClick={props.onCloseButtonClicked}
                >
                <MdClose></MdClose>
            </button>
            <ul className="profile-menu">
                <li className="list-item-wrapper">
                    <Link
                        to="/about"
                        className="menu-button">
                        About
                    </Link>
                </li>
                <li className="list-item-wrapper">
                    <button
                        onClick={props.onLogoutClicked}
                        className="menu-button">
                        Sign out
                    </button>
                </li>
            </ul>
        </nav>
    );
}
