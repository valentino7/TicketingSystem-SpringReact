import React from 'react';
import UserList from "../../views/UserManagement/UserList/UserList";
import {bindActionCreators} from "redux";
import { DEBUG_USERLISTCONTAINER_LIFECYCLE, DEBUG_USERLIST_CACHE } from "../../_constants/debugConstants";
import { connect } from 'react-redux';
import { userActions } from "../../_actions";
import ConfigurationFile from "../../util/ConfigurationFile";

class UserListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        internalRoles: ConfigurationFile.getInternalRoles(),
        externalRoles: ConfigurationFile.getExternalRoles()
    };

    /* Binding */
    this.createUser = this.createUser.bind(this);
    this.readUsers = this.readUsers.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }


  /* CRUD OPERATIONS */

  /* Create a new user */
  createUser(newUser) {
    this.props.actions.create(newUser);
  }

  /* Read user list */
  readUsers() {
    if (!this.props.isValid) {
      this.props.actions.getAll();
    }
  }

  /* Update user data */
  updateUser(arrayIndex, userId, updatedUser) {
    this.props.actions.update(arrayIndex, userId, updatedUser);
  }

  /* Delete user */
  deleteUser(arrayIndex, userId) {
    this.props.actions.delete(arrayIndex, userId);
  }

  componentWillMount() {
    this.readUsers(); // Read users list
  }

  render() {
    return(
      <React.Fragment>
        <UserList deleteUser={this.deleteUser} updateUser={this.updateUser} createUser={this.createUser} users={this.props.users} internalRoles={this.state.internalRoles} externalRoles={this.state.externalRoles} />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.users,
    isValid: state.users.isValid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListContainer);
