import React, { Component } from 'react';

import {
  CardBody,
  Col,
  Card,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

class CreateTarget extends Component{
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }




  handleChange(evt){
    this.props.onChange(evt);
  }


  render(){

    let optionFields = this.props.typology.map ( f =>
      <option key={f.id} value={f.id}>{f.id}</option>
    );


    return(
      <CardBody>
        <FormGroup row>
          <Col>
            <Label>Category</Label>
            <Input type="select" name="category" value={this.props.category} id="select"  onChange={this.handleChange} required>
              <option value="">Please select</option>
              <option value="Product">Product</option>
              <option value="Service">Service</option>
              <option value="Other">Other</option>
            </Input>
          </Col>
          <Col>
            <Label>Typology</Label>
            <Input type="select" name="typId" value={this.props.typId} id="typId"  onChange={this.handleChange} required>
              <option value="">Please select</option>
              {optionFields}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="6">
            <FormGroup>
              <Label htmlFor="text-input">Name</Label>
              <Input type="text" id="text-input" name="name" value={this.props.name} placeholder="Insert the name of your target..." onChange={this.handleChange} required />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label htmlFor="text-input">Version</Label>
              <Input type="text" id="text-input" name="version" value={this.props.version} placeholder="Insert version of your target..." onChange={this.handleChange} required/>
            </FormGroup>
          </Col>
        </FormGroup>
      </CardBody>
    );
  }
}
export default CreateTarget;
