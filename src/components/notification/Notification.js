import React from 'react';
import MdDone from 'react-icons/md/done';
import MdClose from 'react-icons/md/close';
import { Link } from 'react-router';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <div>
        { !props.notification.isLink && <p className={"notification "+(props.notification && props.notification.message ? '' : 'off-screen')}>
            <MdDone className="notification-icon"/>
            {props.notification.message}
            <button
                className="notification-close-button"
                aria-label="Close"
                onClick={props.onCloseButtonClicked}
                >
                <MdClose></MdClose>
            </button>
        </p> }
        { props.notification.isLink &&
            <Link to={"/" + props.notification.location}
                onClick={props.onCloseButtonClicked}
                className={"notification notification-link"+(props.notification && props.notification.message ? '' : 'off-screen')}>
            <MdDone className="notification-icon"/>
            {props.notification.message}
        </Link> }
        </div>
    );
}
