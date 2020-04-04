import React from 'react';
import {connect} from "react-redux";
import EditProfile from "../../views/EditProfile/EditProfile";
import {bindActionCreators} from "redux";
import {alertActions, userActions} from "../../_actions";

import { DEBUG_EDITPROFILECONTAINER_LIFECYCLE } from "../../_constants/debugConstants";

class EditProfileContainer extends React.Component {
  constructor(props) {
    super(props);

    this.updateUser = this.updateUser.bind(this);
  }

  /* Update user data */
  updateUser(id, updatedUser) {
    this.props.userActions.editProfile(id, updatedUser);
  }

  componentWillMount() {
    if (DEBUG_EDITPROFILECONTAINER_LIFECYCLE)
      alert("EditProfileContainer: will mount");
  }

  componentDidMount() {
    if (DEBUG_EDITPROFILECONTAINER_LIFECYCLE)
      alert("EditProfileContainer: did mount");
  }

  componentWillUpdate(nextProps) {
    if (DEBUG_EDITPROFILECONTAINER_LIFECYCLE)
      alert("EditProfileContainer: will update");
      console.log(nextProps.user);
  }

  componentDidUpdate() {
    if (DEBUG_EDITPROFILECONTAINER_LIFECYCLE)
      alert("EditProfileContainer: did update");
  }

  componentWillUnmount() {
    if (DEBUG_EDITPROFILECONTAINER_LIFECYCLE)
      alert("EditProfileContainer: will unmount");
  }

  render() {
    if (DEBUG_EDITPROFILECONTAINER_LIFECYCLE)
      alert("EditProfileContainer: will render");

    return(
      <EditProfile user={this.props.user} updateUser={this.updateUser}/>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.authentication.user };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    alertActions: bindActionCreators(alertActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfileContainer);


