import React from 'react';
import { formatPrice } from '../../helpers/priceFormatting';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <ul className="product-list"> { props.productList &&
            Object.keys(props.productList).map(key => (
                <li key={ key } >
                    <div className="list-item-wrapper">
                        <img className="product-image" width="90" height="90" src={props.productList[key].prodImg} alt="product"></img>
                        <div className="product-info">
                            <span className="product-name">{ props.productList[key].prodName }</span>
                            <span className="cost">{ formatPrice(props.productList[key].prodCost) } / Unit</span>
                            <div className="product-button-wrap">
                                <button className="secondary-button" onClick={ () => { props.handleSubmit(props.productList[key]) } }>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            ))
        }
        </ul>
    );
}
