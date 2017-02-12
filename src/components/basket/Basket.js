import React from 'react';
import BasketItem from './BasketItem';
import BasketEmpty from './BasketEmpty';
import { Link } from 'react-router';
const Basket = props => (
        <div>
            { !!Object.keys(props.items).length &&
                <div>
                    <Link to="/add-credit" className="button-wire add-credit"><span className="add-credit-text">Add credit</span></Link>
                    <div className="main-container">
                        <h2 className="in-app-title">Account activity</h2>
                    </div>
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
                </div>
            }
            { !Object.keys(props.items).length &&
                <BasketEmpty />
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
