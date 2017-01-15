import React, { Component } from 'react';
import Catalogue from './Catalogue';
import { connect } from 'react-redux';
import ProductsApi from '../../../api/products-api';

class CatalogueWrap extends Component {

    componentDidMount() {
       ProductsApi.getProducts(this.props.currentTeam);
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
const mapStateToProps = function(store) {
  return {
     productList: store.productsReducer.productList,
     user: store.userReducer.user,
     currentTeam: store.userReducer.currentTeam,
  };
}

export default connect(mapStateToProps)(CatalogueWrap);
