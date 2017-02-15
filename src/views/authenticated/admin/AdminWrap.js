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
       this.generateShoppingList();
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

    generateShoppingList() {
        const usersList = this.props.usersList;
        this.productsToVotes = {};

        for (var user in usersList) {
            if (usersList.hasOwnProperty(user)) {
                const upvotedItems = usersList[user].teams['tvx-0001'].upvotedItems;
                console.log(upvotedItems);
                if (upvotedItems) {
                    for (var itemId in upvotedItems) {
                        if (upvotedItems.hasOwnProperty(itemId)) {
                            if (!this.productsToVotes[itemId]) {
                                this.productsToVotes[itemId] = { count:0 };
                                console.log('this.productsToVotes', this.productsToVotes);
                            }
                            let currentCount = this.productsToVotes[itemId].count;
                            this.productsToVotes[itemId].count = currentCount + 1;
                        }
                    }
                }
            }

            for (var prodKey in this.props.productList) {
                if (this.props.productList.hasOwnProperty(prodKey)) {
                    let product = this.props.productList[prodKey];
                    if (this.productsToVotes[product.id]) {
                        this.productsToVotes[product.id].prodName = product.prodName;
                    } else if (product.outOfStock) {
                        this.productsToVotes[product.id] = {
                            prodName: product.prodName,
                            count: 0,
                            outOfStock: true,
                        }
                    }
                }
            }
        }

    }

    calculateTotal(user) {
        const items = user.teams ? user.teams[this.props.currentTeam].items : {};
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
                productsToVotes={this.productsToVotes}
                productList={this.props.productList}
                />
        );
    }
}
const mapStateToProps = function(store) {
  return {
     usersList: store.adminReducer.usersList,
     user: store.userReducer.user,
     currentTeam: store.userReducer.currentTeam,
     productList: store.productsReducer.productList,
  };
}

export default connect(mapStateToProps)(AdminWrap);
