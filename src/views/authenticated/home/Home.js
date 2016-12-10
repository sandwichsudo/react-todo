import React, { Component } from 'react';
import BasketWrap from '../../../components/basket/BasketWrap';
import { connect } from 'react-redux';
// Components

class Home extends Component {
    render() {
        return (
            <div>
                <h2>You have chosen the following items:</h2>
                <BasketWrap/>
            </div>
        );
    }
}

export default Home;
