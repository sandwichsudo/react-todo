import React from 'react';

// Using "Stateless Functional Components"
export default function(props) {
    return (
        <ul className="list"> { props.usersList &&
            Object.keys(props.usersList).map(key => (
                <li key={ key } >
                    <div className="list-item-wrapper">
                        <span className="name">{ props.usersList[key].displayName }</span>
                        <span className="owes">£ { props.calculateTotal(props.usersList[key]).toFixed(2) }</span>
                    </div>
                </li>
            ))
        }
        </ul>
    );
}
