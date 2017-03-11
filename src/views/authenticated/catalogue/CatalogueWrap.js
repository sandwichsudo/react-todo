import React, { Component } from 'react';
import Catalogue from './Catalogue';
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
            <Catalogue
                productList={this.props.productList}
                user={this.props.user}
                />
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
