import React from 'react';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <h4>Total is £ { Number(props.total).toFixed(2) }</h4>
    );
}
