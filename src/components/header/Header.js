import React from 'react';
import MdAccountCircle from 'react-icons/md/account-circle';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <header className="header">
            <h1 className="app-title">
                <span className="app-title-text">{props.title}</span>
            </h1>
            {props.user && props.user.displayName && <button className="button header-button" onClick={props.onProfileClicked}>
                {!props.user.photoURL && <MdAccountCircle className="profile-photo"/>}
                {props.user.photoURL && <img className="profile-photo" alt="account profile" width="35" height="35" src={props.user.photoURL}/>}
            </button>
            }
        </header>
    );
}
