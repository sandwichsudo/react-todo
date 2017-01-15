import React from 'react';
import { formatPrice } from '../../helpers/priceFormatting';
const BasketItem = props => (
    <li>
        <div className="basket-item-wrapper">
            <div className="basket-item-info-wrapper">
                <span className="basket-item-count">{ props.item.count }</span>
                <span className="basket-item-name">{ props.item.prodName }</span>
            </div>
            <div className="basket-item-action-wrapper">
                <span className="basket-item-cost"> { formatPrice(props.item.prodCost * props.item.count) }</span>
                <button
                    aria-label="Remove"
                    className="basket-item-remove"
                    onClick={ () => props.handleRemoveProduct(props.index) }
                >
                </button>
            </div>
        </div>
    </li>
)

BasketItem.propTypes = {
    index: React.PropTypes.string,
    item: React.PropTypes.object,
    handleRemoveProduct: React.PropTypes.func,
};

BasketItem.defaultProps = {
    index: null,
    item: {},
    handleRemoveProduct: () => {},
};

export default BasketItem;
