import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {connect} from "react-redux";
import 'react-notifications/lib/notifications.css';

import { DEBUG_ALERT_LIFECYCLE } from "../_constants/debugConstants";

class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.createNotification = this.createNotification.bind(this);
  }

  componentWillMount() {
    if (DEBUG_ALERT_LIFECYCLE)
      alert("Alert will mount");
  }

  componentDidMount() {
    this.createNotification(this.props.alert.type, this.props.alert.message, this.props.alert.title);

    if (DEBUG_ALERT_LIFECYCLE)
      alert("Alert did mount");
  }

  componentWillUpdate(nextProps) {
    if (DEBUG_ALERT_LIFECYCLE)
      alert("Alert will update");
  }

  componentDidUpdate() {
    this.createNotification(this.props.alert.type, this.props.alert.message, this.props.alert.title);

    if (DEBUG_ALERT_LIFECYCLE)
      alert("Alert did update");
  }

  componentWillUnmount() {
    if (DEBUG_ALERT_LIFECYCLE)
      alert("Alert will unmount");
  }

  createNotification(type, message, title) {
    if (DEBUG_ALERT_LIFECYCLE)
      alert("Alert: create notification");

    switch (type) {
      case "alert-success":
        NotificationManager.success(message.toString(), title, 3000);
        break;
      case "alert-danger":
        NotificationManager.error(message.toString(), title, 5000);
        break;
      default:
        break;
    }
  };

  render() {
    if (DEBUG_ALERT_LIFECYCLE)
      alert("Alert render");

    return(
      <NotificationContainer />
    );
  }
}

function mapStateToProps(state) {
  return {
    alert: state.alert
  };
}

export default connect(mapStateToProps)(Alert);
