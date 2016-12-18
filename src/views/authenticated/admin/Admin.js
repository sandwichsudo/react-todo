import React from 'react';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <div>
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
            <h2>This is a list of which users owe what:</h2>
            <ul className="list"> { props.usersList &&
                Object.keys(props.usersList).map(key => (
                    <li key={ key } >
                        <div className="list-item-wrapper">
                            <span className="name">{ props.usersList[key].displayName }</span>
                            <span className="owes">£ { props.calculateTotal(props.usersList[key]).toFixed(2) }</span>
                        </div>
                    </li>
                ))
            }
            </ul>
        </div>
    );
}
