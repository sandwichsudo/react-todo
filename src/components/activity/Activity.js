import React from 'react';
import ActivityItem from './ActivityItem';
import ActivityEmpty from './ActivityEmpty';
import { Link } from 'react-router';
const Activity = props => (
        <div>
            { !!Object.keys(props.items).length &&
                <div>
                    <Link to="/add-credit" className="button-wire add-credit"><span className="add-credit-text">Add credit</span></Link>
                    <div className="main-container">
                        <h2 className="in-app-title">Account activity</h2>
                    </div>
                    <ul className="list"> {
                        Object.keys(props.items).map(key => (
                            <ActivityItem
                                item={props.items[key]}
                                index={key}
                                key={key}
                                handleRemoveProduct={props.handleRemoveProduct}
                            />
                        ))
                    }
                    </ul>
                </div>
            }
            { !Object.keys(props.items).length &&
                <ActivityEmpty />
            }
        </div>
);

Activity.propTypes = {
    items: React.PropTypes.object,
    handleRemoveProduct: React.PropTypes.func,
};

Activity.defaultProps = {
    items: {},
    handleRemoveProduct: () => {},
};

export default Activity;
