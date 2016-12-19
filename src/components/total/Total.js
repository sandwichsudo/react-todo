import React from 'react';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <div className="total-wrapper">
            <div className="total-header">Total</div>
            <div className="total-value">
               £{ Number(props.total).toFixed(2) }
           </div>
        </div>
    );
}
