import React from 'react';
import ProductListWrap from '../../../components/product-list/ProductListWrap';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <div>
            <h2>You can select any of the following items:</h2>
            { props.productList && <ProductListWrap/> }
            { props.user && props.user.isAdmin && <div>
                <p>As an admin, you can add more items to the catalogue:</p>
                <form onSubmit={ props.handleSubmit } >
                    <input
                        className="input"
                        onChange={ props.handleChange }
                        value={ props.text }
                    />
                <button className="primary-button">Add</button>
                </form >
            </div>}
        </div>
    );
}
