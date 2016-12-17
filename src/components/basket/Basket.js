import React from 'react';
import { Link } from 'react-router';
import FaMinusCircle from 'react-icons/fa/minus-circle';

const Basket = props => (
        <div>
            { !!Object.keys(props.items).length &&
                <div>
                        <ul className="product-list"> { props.productList &&
                            Object.keys(props.items).map(key => (
                                <li key={ key } >
                                    <div className="product-wrapper">
                                        <div className="product-info">
                                            <span className="product-name">{ props.productList[key].prodName }</span>
                                            <span className="cost">£ { Number(props.productList[key].prodCost).toFixed(2) } / Unit</span>
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
                    <ul className="product-list"> {
                        Object.keys(props.items).map(key => (
                            <li key={ key } >
                                <div className="product-wrapper">
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
                    <h2>No items in your basket! Add some here: </h2>
                    <Link to="/catalogue">Catalogue</Link>
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
