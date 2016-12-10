import React, { Component } from 'react';
import Basket from '../basket/Basket';

class Catalogue extends Component {
    render() {
        return (
            <div>
                {this.props.loading && <div className="loader">Loading</div>}
                {!this.props.loading && <main className="main-container">
                    <h2>You can select any of the following items:</h2>
                    <Basket items={ this.props.products }/>
                    <div>
                        <p>As an admin, you can add more items to the catalogue:</p>
                        <form onSubmit={ this.props.handleSubmit } >
                            <input
                                className="input"
                                onChange={ this.props.handleChange }
                                value={ this.props.text }
                            />
                        <button className="primary-button"> { 'Add #' + (this.props.products.length + 1) } </button>
                        </form >
                    </div>
                </main>}
            </div>
        );
    }
}

export default Catalogue;
