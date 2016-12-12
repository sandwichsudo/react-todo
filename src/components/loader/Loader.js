import React from 'react';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <div>{props.loading && <div className="loader">Loading</div>}</div>
    );
}
