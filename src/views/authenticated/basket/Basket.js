import React, { Component } from 'react';

class Basket extends Component {
    render() {
        return (
            <div>
                <ul className="basket-list"> {
                    this.props.items.map(item => (
                        <li key={ item.id } > { item.text } </li>
                    ))
                }
                </ul>
            </div>
        );
    }
}

export default Basket;
