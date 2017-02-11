import React from 'react';
import { formatPrice } from '../../../helpers/priceFormatting';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <div>
            <div className="main-container">
                <h2 className="in-app-title">Who owes what</h2>
            </div>
            <ul className="list admin-list"> { props.usersList &&
                Object.keys(props.usersList).map(key => (
                    <li key={ key } >
                         { props.calculateTotal(props.usersList[key]) !== 0 && <div className="list-item-wrapper">
                            <span className="name">{ props.usersList[key].displayName }</span>
                            <span className="owes">{ formatPrice(props.calculateTotal(props.usersList[key])) }</span>
                        </div>  }
                    </li>
                ))
            }
            </ul>

            <div className="main-container">
                <h2 className="in-app-title">Shopping list</h2>
            </div>
            <ul className="list admin-list"> { props.productsToVotes &&
                Object.keys(props.productsToVotes).map(key => (
                    <li key={ key } className={ (props.productsToVotes[key].outOfStock ? 'out-of-stock' : '')}>
                        <div className="list-item-wrapper">
                            <span className="name">{ props.productsToVotes[key].prodName }</span>
                            <span className="owes">{ props.productsToVotes[key].count } vote</span>
                        </div>
                    </li>
                ))
            }
            </ul>

        </div>
    );
}
