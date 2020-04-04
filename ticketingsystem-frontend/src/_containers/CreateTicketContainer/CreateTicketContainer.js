import React from 'react';
import {connect} from "react-redux";
import CreateTicket from "../../views/Ticket/TicketByCustomer/CreateTicket";
import {bindActionCreators} from "redux";
import {alertActions, userActions} from "../../_actions";

import { DEBUG_EDITPROFILECONTAINER_LIFECYCLE } from "../../_constants/debugConstants";

class CreateTicketContainer extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return(
      <CreateTicket user={this.props.user} />
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
)(CreateTicketContainer);


