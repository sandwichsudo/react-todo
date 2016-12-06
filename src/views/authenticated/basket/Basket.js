import React, { Component } from 'react';

class Basket extends Component {
    render() {
        return (
            <ul className="basket-list"> {
                this.props.items.map(item => (
                    <li key={ item.id } > { item.text } </li>
                ))
            }
            </ul>
        );
    }
}

export default Basket;
