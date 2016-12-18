import React from 'react';
import { Link } from 'react-router';
import FaMinusCircle from 'react-icons/fa/minus-circle';

const Basket = props => (
        <div>
            { !!Object.keys(props.items).length &&
                <div>
                    <ul className="list"> {
                        Object.keys(props.items).map(key => (
                            <li key={ key } >
                                <div className="list-item-wrapper">
                                    <span className="product-name">{ props.items[key].prodName }</span>
                                    <span className="cost">£ { Number(props.items[key].prodCost).toFixed(2) }</span>
                                    <button onClick={ () => props.handleRemoveProduct(key) }>
                                        <FaMinusCircle />
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                    </ul>
                </div>
            }
            { !Object.keys(props.items).length &&
                <div>
                    <h2>No items in your tab! Add some here: </h2>
                    <Link to="/shop">Shop</Link>
                </div>
            }
        </div>
);

Basket.propTypes = {
    items: React.PropTypes.object,
    handleRemoveProduct: React.PropTypes.func,
};

Basket.defaultProps = {
    items: {},
    handleRemoveProduct: () => {},
};

export default Basket;
