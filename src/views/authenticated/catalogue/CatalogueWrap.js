import React, { Component } from 'react';
import Catalogue from './Catalogue';
import { connect } from 'react-redux';
import ProductsApi from '../../../api/products-api';

class CatalogueWrap extends Component {
    constructor(props) {
        super(props);
        this.handleProdNameChange = this.handleProdNameChange.bind(this);
        this.handleProdCostChange = this.handleProdCostChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { prodCost: '', prodName: '' };
    }

    componentDidMount() {
       ProductsApi.getProducts();
    }

    handleProdCostChange(e) {
        this.setState({ prodCost: e.target.value });
    }

    handleProdNameChange(e) {
        this.setState({ prodName: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        var newItem = {
            prodName: this.state.prodName,
            prodCost: this.state.prodCost,
            id: Date.now()
        };

        ProductsApi.addProduct(newItem);
        this.setState((prevState) => {
            return {
                prodName: '',
                prodCost: '',
            };
        });
    }

    render() {
        return (
            <Catalogue
                productList={this.props.productList}
                user={this.props.user}
                handleSubmit={this.handleSubmit}
                handleProdCostChange={this.handleProdCostChange}
                handleProdNameChange={this.handleProdNameChange}
                prodCost={this.state.prodCost}
                prodName={this.state.prodName}
                />
        );
    }
}
const mapStateToProps = function(store) {
  return {
     productList: store.productsReducer.productList,
     user: store.userReducer.user
  };
}

export default connect(mapStateToProps)(CatalogueWrap);
