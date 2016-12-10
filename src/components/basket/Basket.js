import React, { Component } from 'react';

export default function(props) {
    return (
        <ul className="product-list"> {
            props.items &&
                Object.keys(props.items).map(key => (
                    <li key={ key } >
                        <span>{ props.items[key].text }</span>
                    </li>
                ))
        }
        </ul>
    );
}
