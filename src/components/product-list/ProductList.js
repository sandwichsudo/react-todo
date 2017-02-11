import React from 'react';
import { formatPrice } from '../../helpers/priceFormatting';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <ul className="product-list"> { props.productList &&
            Object.keys(props.productList).map(key => (
                <li key={ key } >
                    <div className="list-item-wrapper">
                        <img className="product-image" width="80" height="80" src={props.productList[key].prodImg} alt="product"/>
                        <div className="product-info">
                            <span className="product-name">{ props.productList[key].prodName }</span>
                            <span className="cost">{ formatPrice(props.productList[key].prodCost) } / Unit</span>
                            { props.productList[key].outOfStock &&
                                <div className="out-of-stock-wrap">Sorry, this product is out of stock! If you want it to be restocked you can
                                    <button
                                        onClick={ () => { props.handleRestockRequest(props.productList[key]) } }
                                        className="inline-button"> vote for restock</button>.</div>
                            }
                            { !props.productList[key].outOfStock &&
                                <div className="product-button-wrap">
                                    <button className="secondary-button"
                                        onClick={ () => { props.handleSubmit(props.productList[key]) } }>
                                        Buy
                                    </button>
                               </div>
                            }
                        </div>
                    </div>
                </li>
            ))
        }
        </ul>
    );
}
