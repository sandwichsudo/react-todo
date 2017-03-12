import React from 'react';

export default function(props) {
    return (
        <div className="form-wrap">
            {<div>
                <div className="main-container">
                    <h2 className="in-app-title">Add cash to your account</h2>
                    <ol className="add-credit-list">
                        <li className="add-credit-item"><span className="add-credit-text">Put the cash in the cash box.</span></li>
                        <li className="add-credit-item"><span className="add-credit-text">Enter the amount below to add it to your account.</span></li>
                    </ol>

                    <form onSubmit={props.handelSubmit} >
                       <label className="credit-label">
                           <span className="credit-label-text">£</span>
                           <input value={props.creditAmount} onChange={props.handleCreditChange} className="input credit-input"
                               type="number" step="0.01" min="0.01" max="100" placeholder="e.g 1.20"/>
                        </label>
                        <div className="button-wrap">
                           <button type="submit" className="primary-button">Add cash</button>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    );
}
