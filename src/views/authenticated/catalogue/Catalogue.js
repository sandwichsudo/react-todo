import React from 'react';
import ProductListWrap from '../../../components/product-list/ProductListWrap';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <div>
            { props.productList && <ProductListWrap/> }
            { props.user && props.user.isAdmin && <div className="main-container">
                <p>As an admin, you can add more items to the catalogue:</p>
                <form onSubmit={ props.handleSubmit } >
                    <label>
                        <span className="label">Product name</span>
                        <input
                            className="input"
                            onChange={ props.handleProdNameChange }
                            value={ props.prodName }
                        />
                    </label>
                    <label>
                        <span className="label">Product cost</span>
                        <input
                            className="input"
                            type="number"
                            onChange={ props.handleProdCostChange }
                            value={ props.prodCost }
                        />
                    </label>
                <button className="primary-button">Add</button>
                </form >
            </div>}
        </div>
    );
}
