import React from 'react';
import { Link } from 'react-router';
export default function(props) {
    return (
        <div>
            { props.items &&
                <div>
                    <h2>You have chosen the following items:</h2>
                    <ul className="product-list"> {
                        props.items &&
                            Object.keys(props.items).map(key => (
                                <li key={ key } >
                                    { props.items[key].prodName }: £{ props.items[key].prodCost }
                                </li>
                            ))
                    }
                    </ul>
                </div>
            }
            { !props.items &&
                <div>
                    <h2>No items in your basket! Add some here: </h2>
                    <Link to="/catalogue">Catalogue</Link>
                </div>
            }
        </div>
    );
}
