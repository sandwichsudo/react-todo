import React, { Component } from 'react';
import { browserHistory } from 'react-router';
var firebase = require('firebase/app');
import userApi from '../../../api/user-api';
import AddCredit from './AddCredit';
import UiApi from '../../../api/ui-api';
import { connect } from 'react-redux';

class AddCreditWrap extends Component {
    constructor(props) {
        super(props);
        this.handelSubmit = this.handelSubmit.bind(this);
        this.handleCreditChange = this.handleCreditChange.bind(this);
        this.state = { creditAmount: 0 };
    }

    handelSubmit(e) {
        e.preventDefault();
        //UiApi.startLoading();
        userApi.addToBalance(this.props.user.uid, this.props.currentTeam,
            Number(this.state.creditAmount)*100);
    }

    handleCreditChange(event) {
        this.setState({ creditAmount: event.target.value });
    }

    render() {
        return (
            <AddCredit
                handelSubmit={this.handelSubmit}
                handleCreditChange={this.handleCreditChange}
                creditAmount={this.state.creditAmount}
            />
        );
    }
}

const mapStateToProps = function(store) {
  return {
    user: store.userReducer.user,
    currentTeam: store.userReducer.currentTeam
  };
}

export default connect(mapStateToProps)(AddCreditWrap);
