import React from 'react';
import MdDone from 'react-icons/md/done';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <p className={"notification "+(props.notification && props.notification.message ? '' : 'off-screen')}><MdDone className="notification-icon"/>{props.notification.message}</p>
    );
}
