import React, { Component } from 'react';
import './Basket.css';

class Basket extends Component {
    render() {
        return ( <
            ul > {
                this.props.items.map(item => ( <
                    li key = { item.id } > { item.text } < /li>
                ))
            } <
            /ul>
        );
    }
}

export default Basket;
