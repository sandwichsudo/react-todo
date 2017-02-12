import React from 'react';
import { formatPrice } from '../../helpers/priceFormatting';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <div className="total-wrapper">
            <div className="total-header">Balance</div>
            <div className="total-value">
               { formatPrice(props.balance) }
           </div>
        </div>
    );
}
