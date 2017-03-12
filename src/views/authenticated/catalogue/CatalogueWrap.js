import React, { Component } from 'react';
import Catalogue from './Catalogue';
import CharityBalanceWrap from '../../../components/charity-balance/CharityBalanceWrap';

import { connect } from 'react-redux';
import ProductsApi from '../../../api/products-api';

class CatalogueWrap extends Component {
    componentWillMount() {
        ProductsApi.getProducts(this.props.currentTeam,
            this.props.params.category);
                console.log('category:', this.props.params.category);
    }

    render() {
        return (
            <div>
                <CharityBalanceWrap/>
                <Catalogue
                    productList={this.props.productList}
                    user={this.props.user}
                    />
            </div>
        );
    }
}

CatalogueWrap.propTypes = {
    currentTeam: React.PropTypes.string,
    category: React.PropTypes.string,
    productList: React.PropTypes.object,
    user: React.PropTypes.object,
};

CatalogueWrap.defaultProps = {
    currentTeam: "",
    category: "",
    productList: {},
    user: {},
};

const mapStateToProps = function(store) {
  return {
     productList: store.productsReducer.productList,
     user: store.userReducer.user,
     currentTeam: store.userReducer.currentTeam,
  };
}

export default connect(mapStateToProps)(CatalogueWrap);
