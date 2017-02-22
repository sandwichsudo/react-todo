import React from 'react';
import { formatPrice } from '../../helpers/priceFormatting';
import LoaderWrap from '../loader/LoaderWrap.js';
import { connect } from 'react-redux';

const BasketItem = props => (
    <li>
        <div className="basket-item-wrapper">
            <div className="basket-item-info-wrapper">
                <span className="basket-item-name">{ props.item.label ? props.item.label : props.item.action }</span>
            </div>
            <div className="basket-item-action-wrapper">
                <span className="basket-item-cost"> { formatPrice(props.item.value) }</span>
                { !props.inlineLoading.has(props.index) &&
                    <button
                    aria-label="Remove"
                    className="basket-item-remove"
                    onClick={ () => props.handleRemoveProduct(props.index) }
                >
            </button> }
            { props.inlineLoading.has(props.index) &&
                <button
                disabled="disabled"
                className="basket-item-disabled">
                    <LoaderWrap inlineLoader="true"/>
                </button>
            }
            </div>
        </div>
    </li>
)

BasketItem.propTypes = {
    index: React.PropTypes.string,
    item: React.PropTypes.object,
    handleRemoveProduct: React.PropTypes.func,
    inlineLoading: React.PropTypes.object,
};

BasketItem.defaultProps = {
    index: null,
    item: {},
    handleRemoveProduct: () => {},
    inlineLoading: {},
};

const mapStateToProps = function(store) {
  return {
    inlineLoading: store.uiReducer.inlineLoading,
  };
}

export default connect(mapStateToProps)(BasketItem);
