import React from 'react';
import { bindActionCreators } from 'redux';
import { userActions } from '../../_actions/index';
import { connect } from 'react-redux';
import RegisterPage from "../../views/Pages/Register/RegisterPage";
import {DefaultLayout} from "../../containers";
import {LoginPage} from "../../views/Pages";
import {PrivateRoute, PublicRoute} from "../../_components";
import { HashRouter, Switch } from 'react-router-dom';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../../scss/style.css'

import { DEBUG_SESSIONCONTAINER_LIFECYCLE } from "../../_constants/debugConstants";

import {configFileActions} from "../../_actions";

class SessionContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      registering: this.props.registering,
      loggingIn: this.props.loggingIn
    };

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  register(user) {
    this.props.actions.register(user);
  }

  login(username, password) {
    this.props.actions.login(username, password);
  }

  logout() {
    this.props.actions.logout();
  }

  componentWillMount() {
    if (DEBUG_SESSIONCONTAINER_LIFECYCLE)
      alert("SessionContainer: will mount");
    this.props.configFileActions.getConfigFile();
  }

  componentDidMount() {
    if (DEBUG_SESSIONCONTAINER_LIFECYCLE)
      alert("SessionContainer: did mount");
  }

  componentWillUpdate(nextProps) {
    if (DEBUG_SESSIONCONTAINER_LIFECYCLE)
      alert("SessionContainer: will update");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loggingIn !== this.props.loggingIn) {
      this.setState({ loggingIn: this.props.loggingIn });
    }

    if (prevProps.registering !== this.props.registering) {
      this.setState({ registering: this.props.registering });
    }

    if (DEBUG_SESSIONCONTAINER_LIFECYCLE)
      alert("SessionContainer: did update");
  }

  componentWillUnmount() {
    if (DEBUG_SESSIONCONTAINER_LIFECYCLE)
      alert("SessionContainer: will unmount");
  }

  render() {
    if (DEBUG_SESSIONCONTAINER_LIFECYCLE)
      alert("SessionContainer: render");

    return(
      <React.Fragment>
      <HashRouter>
        <Switch>
          <PublicRoute path="/login"
                       name="Login Page"
                       component={LoginPage}
                       loggingIn={this.state.loggingIn}
                       login={this.login}
          />
          <PublicRoute path="/register"
                       name="Register Page"
                       component={RegisterPage}
                       registering={this.state.registering}
                       register={this.register}
          />
          <PrivateRoute path="/"
                        name="Home"
                        component={DefaultLayout}
                        logout={this.logout}
          />
        </Switch>
      </HashRouter>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    registering: state.loading.isRegistering,
    loggingIn: state.loading.isLoggingIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
    configFileActions: bindActionCreators(configFileActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionContainer);
