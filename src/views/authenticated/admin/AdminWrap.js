import React, { Component } from 'react';
import Admin from './Admin';
import { connect } from 'react-redux';
import AdminApi from '../../../api/admin-api';

class AdminWrap extends Component {
    constructor(props) {
        super(props);
        this.calculateTotal = this.calculateTotal.bind(this);
    }

    componentDidMount() {
       AdminApi.getUsers();
    }

    calculateTotal(user) {
        const items = user.items;
        let total = 0;
        if (items) {
            Object.keys(items).map(key => {
                total+= Number(items[key].prodCost);
            });
        }
        return total;
    }

    render() {
        return (
            <Admin
                calculateTotal={this.calculateTotal}
                usersList={this.props.usersList}
                />
        );
    }
}
const mapStateToProps = function(store) {
  return {
     usersList: store.adminReducer.usersList
  };
}

export default connect(mapStateToProps)(AdminWrap);
