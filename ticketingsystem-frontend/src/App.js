import React, { Component } from 'react';
import './App.css';
// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'
import SessionContainer from './_containers/SessionContainer'
import Alert from './_components/Alert'
import 'react-notifications/lib/notifications.css';
import { DEBUG_APP_LIFECYCLE } from "./_constants/debugConstants";

class App extends Component {

  componentWillMount() {
    if (DEBUG_APP_LIFECYCLE)
      alert("App will mount");
  }

  componentDidMount() {
    if (DEBUG_APP_LIFECYCLE)
      alert("App did mount");
  }

  componentWillUpdate() {
    alert("App will update");
  }

  componentDidUpdate() {
    if (DEBUG_APP_LIFECYCLE)
      alert("App did update");
  }

  componentWillUnmount() {
    if (DEBUG_APP_LIFECYCLE)
      alert("App will unmount");
  }

  render() {
    if (DEBUG_APP_LIFECYCLE)
      alert("App render");

    return (
      <React.Fragment>
        <Alert />
        <SessionContainer />
      </React.Fragment>
    );
  }
}

export default App;


