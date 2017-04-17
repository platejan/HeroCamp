import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Notification from './parts/Notification';
import {deleteNotification} from '../../actions/notificationActions';
import toastr from 'toastr';

class NotificationBlock extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      notifications: Object.assign({}, this.props.notifications)
    };
    this.deleteNotification = this.deleteNotification.bind(this);
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    let state = this.state;
    state.notifications = Object.assign({}, nextProps.notifications);
    this.setState(state);
  }

  deleteNotification(key) {
    this.props.actions.deleteNotification(this.props.currentUID, key, (error = null)=> {
      if (error != null) {
        toastr.error(error);
      }
    });
  }

  render() {
    let notifications = "";
    let data = this.state.notifications;
    let dataArray = [];
    if (data) {
      Object.keys(data).forEach(function (key, index) {
        dataArray.push({ItemKey: key, ItemContent: data[key]});
      });
    }
    if (dataArray.length > 0) {
      notifications = dataArray.map((Item, index) => {

        const itemKey = Item.ItemKey;
        const itemContent = Item.ItemContent;

        if (!itemContent.delete) {
          return (
            <Notification key={itemKey}
                          itemKey={itemKey}
                          itemContent={itemContent}
                          delete={this.deleteNotification}/>
          );
        }
      });
    }

    return (
      <div>
        <h2>Notifications</h2>
        <div className="row">
          {notifications}
        </div>
      </div>
    );
  }
}
NotificationBlock.propTypes = {};

NotificationBlock.contextTypes = {};

function mapStateToProps(state, ownProps) {
  return {
    currentUID: state.auth.currentUserUID,
    notifications: state.notification
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({deleteNotification}, dispatch)

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBlock);
