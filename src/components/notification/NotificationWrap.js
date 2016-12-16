import React, { Component } from 'react';
import { connect } from 'react-redux';

import Notification from './Notification';

class NotificationWrap extends Component {
    render() {
        return (
            <Notification
                notification={this.props.notification}
                />
        );
    }
}

const mapStateToProps = function(store) {
  return {
    notification: store.uiReducer.notification
  };
}

export default connect(mapStateToProps)(NotificationWrap);
