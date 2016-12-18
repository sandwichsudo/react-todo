import React from 'react';
import ProductListWrap from '../../../components/product-list/ProductListWrap';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <div>
            { props.productList && <ProductListWrap/> }
        </div>
    );
}
