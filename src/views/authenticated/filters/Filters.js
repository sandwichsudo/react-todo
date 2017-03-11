import React from 'react';
import { Link } from 'react-router';

export default function(props) {
    return (
        <ul className="filter-list">
            <li><Link className="filter-link filter-all" to="/products/all">All</Link></li>
            <li><Link className="filter-link filter-sweets" to="/products/sweets">Sweets</Link></li>
            <li><Link className="filter-link filter-savouries" to="/products/savouries">Savouries</Link></li>
            <li><Link className="filter-link filter-drinks" to="/products/drinks">Drinks</Link></li>
        </ul>
    );
}
