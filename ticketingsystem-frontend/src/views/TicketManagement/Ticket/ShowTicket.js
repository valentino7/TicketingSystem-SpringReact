import React, { Component } from 'react';

import {
  Row,
  Col,
} from 'reactstrap';

const fields = [
  /* ID, field name, Type */
  ["state", "State", "text"],
  ["customerPriority", "CustomerPriority", "text"],
  ["attachment","Attachment"],
  ["description","Description"],
];

const referenceField = [
  ["target","Target", "value"],
  ["source","Source", "value"],
  ["assegnee","Assegnee","value"]
];

class ShowTicket extends Component{

  constructor(props) {
    super(props);
  }

  render() {
    let date = new Date(this.props.ticket["timestamp"]).toString();

    let defaultFields= fields.map ( f =>
      <Row>
        <Col><label> {f[1]} :</label>  </Col>
        <Col><label> {this.props.ticket[f[0]]}</label>  </Col>
      </Row>
    );

    let otherFields = referenceField.map (o =>
      <Row>
        <Col><label> {o[1]} :</label>  </Col>
        <Col><label> {this.props.ticket[o[0]][o[2]]}</label>  </Col>
      </Row>
    )

    let additionalFields= this.props.ticket["additionalFieldsValue"].map ( fv =>
      <Row>
        <Col><label> {fv["additionalFieldRef"]["name"]} :</label>  </Col>
        <Col><label> {fv["value"]}</label>  </Col>
      </Row>
    );

    return (
      <div>
        <label>Created on {date}</label>
        {defaultFields}
        {otherFields}
        {additionalFields}



      </div>

    );
  }



}

export default ShowTicket;
