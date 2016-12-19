import React from 'react';
import { Link } from 'react-router';
import BasketItem from './BasketItem';

const Basket = props => (
        <div>
            { !!Object.keys(props.items).length &&
                <div>
                    <ul className="list"> {
                        Object.keys(props.items).map(key => (
                            <BasketItem
                                item={props.items[key]}
                                index={key}
                                key={key}
                                handleRemoveProduct={props.handleRemoveProduct}
                            />
                        ))
                    }
                    </ul>
                    <button
                        onClick={props.clearTab}
                        className="button-wire clear-tab">
                        Clear tab
                    </button>
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
