import React, { Component } from 'react';
import Basket from '../../../components/basket/Basket';
import { connect } from 'react-redux';
class Catalogue extends Component {
    render() {
        return (
            <div>
                <h2>You can select any of the following items:</h2>
                <Basket items={ this.props.products }/>
                { this.props.user.isAdmin && <div>
                    <p>As an admin, you can add more items to the catalogue:</p>
                    <form onSubmit={ this.props.handleSubmit } >
                        <input
                            className="input"
                            onChange={ this.props.handleChange }
                            value={ this.props.text }
                        />
                    <button className="primary-button"> { 'Add #' + (this.props.products.length + 1) } </button>
                    </form >
                </div>}
            </div>
        );
    }
}
const mapStateToProps = function(store) {
  return {
    user: store.userReducer.user
  };
}

export default connect(mapStateToProps)(Catalogue);
