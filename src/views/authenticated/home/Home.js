import React, { Component } from 'react';
import Basket from '../../../components/basket/Basket';
import { connect } from 'react-redux';
// Components

class Home extends Component {
    render() {
        return (
            <div>
                <h2>You have chosen the following items:</h2>
                { this.props.user.items && <Basket items={ this.props.user.items }/> }
            </div>
        );
    }
}
const mapStateToProps = function(store) {
  return {
    user: store.userReducer.user
  };
}

export default connect(mapStateToProps)(Home);
