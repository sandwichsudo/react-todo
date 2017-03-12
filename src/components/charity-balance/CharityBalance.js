import React from 'react';
import { formatPrice } from '../../helpers/priceFormatting';
import { Link } from 'react-router';
// Using "Stateless Functional Components"
export default function(props) {
    return (
        <Link className="total-wrapper" to="/about">
            <div className="total-header">Total raised for charity</div>
            <div className="total-value">
               { formatPrice(props.charityBalance) }
           </div>
        </Link>
    );
}
