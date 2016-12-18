import React from 'react';
import MdDone from 'react-icons/md/done';
import MdClose from 'react-icons/md/close';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <p className={"notification "+(props.notification && props.notification.message ? '' : 'off-screen')}>
            <MdDone className="notification-icon"/>
            {props.notification.message}
            <button
                className="notification-close-button"
                aria-label="Close"
                onClick={props.onCloseButtonClicked}
                >
                <MdClose></MdClose>
            </button>
        </p>
    );
}
