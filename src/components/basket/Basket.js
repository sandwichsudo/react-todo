import React from 'react';
import { Link } from 'react-router';
import FaMinusCircle from 'react-icons/fa/minus-circle';

const Basket = props => (
        <div>
            { !!Object.keys(props.items).length &&
                <div>
                    <h2>You have chosen the following items:</h2>
                    <ul className="product-list"> {
                        Object.keys(props.items).map(key => (
                            <li key={ key } >
                                <button onClick={ () => props.handleRemoveProduct(key) }>
                                    <FaMinusCircle />
                                </button>
                                { props.items[key].prodName }: £{ props.items[key].prodCost }
                            </li>
                        ))
                    }
                    </ul>
                </div>
            }
            { !Object.keys(props.items).length &&
                <div>
                    <h2>No items in your basket! Add some here: </h2>
                    <Link to="/catalogue">Catalogue</Link>
                </div>
            }
        </div>
);

Basket.propTypes = {
    items: React.PropTypes.object,
    handleRemoveProduct: React.PropTypes.function,
};

Basket.defaultProps = {
    items: {},
    handleRemoveProduct: () => {},
};

export default Basket;
