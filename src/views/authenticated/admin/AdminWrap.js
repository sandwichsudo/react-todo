import React, { Component } from 'react';
import Admin from './Admin';
import { connect } from 'react-redux';
import AdminApi from '../../../api/admin-api';
import ProductsApi from '../../../api/products-api';

class AdminWrap extends Component {
    constructor(props) {
        super(props);
        this.calculateTotal = this.calculateTotal.bind(this);
        this.handleProdNameChange = this.handleProdNameChange.bind(this);
        this.handleProdCostChange = this.handleProdCostChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { prodCost: '', prodName: '' };
    }

    componentDidMount() {
       AdminApi.getUsers();
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

        ProductsApi.addProduct(newItem, this.props.currentTeam);
        this.setState((prevState) => {
            return {
                prodName: '',
                prodCost: '',
            };
        });
    }


    calculateTotal(user) {
        const items = user.items;
        let total = 0;
        if (items) {
            for (const key in items) {
                if (items.hasOwnProperty(key)) {
                    total+= Number(items[key].prodCost);
                }
            }
        }
        return total;
    }

    render() {
        return (
            <Admin
                calculateTotal={this.calculateTotal}
                usersList={this.props.usersList}
                handleSubmit={this.handleSubmit}
                handleProdCostChange={this.handleProdCostChange}
                handleProdNameChange={this.handleProdNameChange}
                prodCost={this.state.prodCost}
                prodName={this.state.prodName}
                user={this.props.user}

                />
        );
    }
}
const mapStateToProps = function(store) {
  return {
     usersList: store.adminReducer.usersList,
     user: store.userReducer.user,
     currentTeam: store.userReducer.currentTeam
  };
}

export default connect(mapStateToProps)(AdminWrap);
