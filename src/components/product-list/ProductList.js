import React from 'react';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <ul className="product-list"> { props.productList &&
            Object.keys(props.productList).map(key => (
                <li key={ key } >
                    <button onClick={ () => { props.handleSubmit(props.productList[key]) } }>{ props.productList[key].text }</button>
                </li>
            ))
        }
        </ul>
    );
}
