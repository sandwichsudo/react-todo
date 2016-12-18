import React, { Component } from 'react';
import { connect } from 'react-redux';
import UiApi from '../../api/ui-api';
import Notification from './Notification';

class NotificationWrap extends Component {
    onCloseButtonClicked() {
        UiApi.hideNotification();
    }

    render() {
        return (
            <Notification
                notification={this.props.notification}
                onCloseButtonClicked={this.onCloseButtonClicked}
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
