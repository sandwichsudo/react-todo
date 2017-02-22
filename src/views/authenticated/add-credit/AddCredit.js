import React from 'react';

export default function(props) {
    return (
        <div className="form-wrap">
            {<div>
                <div className="main-container">
                    <h2 className="in-app-title">{'How much credit do you want to add?'}</h2>
                    <p className="add-credit-text">To add credit to your account, put the cash in the TuckShop box and
                    enter the amount in here.</p>
                    <p className="add-credit-text">It gets credited to your account, so you
                    never need to worry about exact change.</p>
                    <form onSubmit={props.handelSubmit} >
                       <label className="credit-label">
                           <span className="credit-label-text">£</span>
                           <input value={props.creditAmount} onChange={props.handleCreditChange} className="input credit-input" type="number" step="0.01" placeholder="e.g 1.20"/>
                        </label>
                        <div className="button-wrap">
                           <button type="submit" className="primary-button">Add credit</button>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    );
}
