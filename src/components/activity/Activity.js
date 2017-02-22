import React from 'react';
import ActivityItem from './ActivityItem';
import ActivityEmpty from './ActivityEmpty';
import { Link } from 'react-router';
const Activity = props => (
        <div>
            <Link to="/add-credit" className="button-wire add-credit"><span className="add-credit-button-text">Add credit</span></Link>
            { !!props.items.length &&
                <div>
                    <div className="main-container">
                        <h2 className="in-app-title">Account activity</h2>
                    </div>
                    <ul className="list"> {
                        props.items.map(item => (
                            <ActivityItem
                                item={item}
                                index={item.key}
                                key={item.key}
                                handleRemoveProduct={props.handleRemoveProduct}
                            />
                        ))
                    }
                    </ul>
                </div>
            }
            { !props.items.length &&
                <div className="main-container">
                    <ActivityEmpty />
                </div>
            }
        </div>
);

Activity.propTypes = {
    items: React.PropTypes.array,
    handleRemoveProduct: React.PropTypes.func,
};

Activity.defaultProps = {
    items: [],
    handleRemoveProduct: () => {},
};

export default Activity;
