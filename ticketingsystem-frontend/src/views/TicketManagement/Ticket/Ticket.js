import React, { Component } from 'react';

import {UncontrolledTooltip , Modal, ModalHeader, ModalBody} from 'reactstrap';
import ShowTicket from './ShowTicket';

class Ticket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);



  }

  toggle() {
    this.setState({
      modal: !this.state.modal

    });
  }

  /* Render the component */
  render() {


    /* Render table rows corresponding to header fields */
    let tableRows = this.props.fields.map(field =>
      <td key={field[0]}>{this.props.ticket[field[0]]}</td>

    );



    return(


      <React.Fragment>
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}>{this.props.ticket["object"]}</ModalHeader>
          <ModalBody>
            <ShowTicket ticket={this.props.ticket}/>
          </ModalBody>
        </Modal>
        <UncontrolledTooltip  placement="left" target="TooltipExample" >View Ticket</UncontrolledTooltip>

        <tr>
          <td><b>{this.props.index + 1}</b></td>
          {tableRows}
          <td ><i  id="TooltipExample" style={{cursor: "pointer"}}  onClick={this.toggle} className="fa fa-info-circle  fa-lg mt-1">{' '}</i></td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Ticket;
