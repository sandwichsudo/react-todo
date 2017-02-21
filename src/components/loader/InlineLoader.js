import React from 'react';
import Spinner from 'react-icons/fa/spinner';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <div className="full-height">{props.loading &&
            <div className="loader-wrap">
                <Spinner className="spinning spinner-loader"></Spinner>
            </div>
                }</div>
    );
}
