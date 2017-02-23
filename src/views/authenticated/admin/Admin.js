import React from 'react';
import { formatPrice } from '../../../helpers/priceFormatting';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <div>
              <div className="main-container">
              <h1 className="in-app-title">Add items to the shop</h1>
                  <form className="admin-form" onSubmit={ props.handleSubmit } >
                      <label>
                          <span className="visuallyhidden">Product name</span>
                          <input
                              placeholder="Product name"
                              className="input"
                              onChange={ props.handleProdNameChange }
                              value={ props.prodName }
                          />
                      </label>
                      <label>
                          <span className="visuallyhidden">Product cost</span>
                          <input
                              placeholder="Product cost"
                              className="input"
                              type="number"
                              onChange={ props.handleProdCostChange }
                              value={ props.prodCost }
                          />
                      </label>
                      <button className="primary-button">Add</button>
                  </form >
              </div>
            <div className="main-container">
                <h2 className="in-app-title">Who owes what</h2>
            </div>
            <ul className="list admin-list"> { props.usersList &&
                Object.keys(props.usersList).map(key => (
                    <li key={ key } >
                         { props.usersList[key].teams[props.currentTeam].balance < 0 && <div className="list-item-wrapper">
                            <span className="name">{ props.usersList[key].displayName }</span>
                            <span className="owes">{ formatPrice(props.usersList[key].teams[props.currentTeam].balance) }</span>
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
