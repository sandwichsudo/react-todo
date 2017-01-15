import React from 'react';
import { formatPrice } from '../../helpers/priceFormatting';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <div className="total-wrapper">
            <div className="total-header">Total</div>
            <div className="total-value">
               { formatPrice(props.total) }
           </div>
        </div>
    );
}
