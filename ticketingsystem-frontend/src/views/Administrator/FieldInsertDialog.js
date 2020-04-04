import React, { Component } from 'react';
import { Button, Col, Form, Input ,FormGroup, Label } from 'reactstrap';


class FieldInsertDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      field: {},
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.handleChangeType= this.handleChangeType.bind(this);
    this.initField =  this.initField.bind(this);


    this.initField();
  }

  initField() {
    this.props.fields.map(field => {
        this.state.field[field[1]] = "";
      }
    );
    this.state.field["ref"] = {
      "id" : 0,
    };

  }

  handleSubmit(event){
    event.preventDefault(); // Prevent default behaviour
    this.props.createField(this.state.field);
    this.setState({ hidden: true });

    this.initField();
  }

  handleChange(evt){
    this.setState({
      field : {
        ...this.state.field,
        [evt.target.name]: evt.target.value
      }
    });

  }


  handleChangeType(evt){
    this.setState({
      field : {
        ...this.state.field,
        "ref": {
          "id" : evt.target.value,
          "ref" : "ticket_additional_fields"
        }
      }
    });

  }

  handleCancel(event) {
    event.preventDefault();

    this.setState({ hidden: true });
    this.initField();
  }

  handleShow(event) {
    event.preventDefault();

    this.setState({ hidden: false });
  }

  render() {

    /* Render table rows corresponding to header fields */
    let tableRows = this.props.fields.map(field =>
      <td key={field[0]}><Input bsSize="sm" name={field[1]} type={field[2]} placeholder={field[1]} onChange={this.handleChange} value={this.state.field[field[0]]}/></td>
    );

    let optionField = this.props.defaultFields.map (field =>
      <option key={field.id} value={field.id}>{field.type}</option>
    );

    return(
      <React.Fragment>
        {!this.state.hidden &&
        <tr>
          <td />
          {tableRows}
          <td>
          <FormGroup>
            <Input bsSize="sm" type="select" name="type" id="select" value={this.state.field["ref"]["id"]} onChange={this.handleChangeType} required>
              <option value="">Please select</option>
              {optionField}
            </Input>
          </FormGroup>
          </td>
          <td>
            <i style={{cursor: "pointer"}} onClick={this.handleSubmit} className="fa fa-check fa-lg mt-1"/><br/>
          </td>
          <td>
            <i style={{cursor: "pointer"}} onClick={this.handleCancel} className="fa fa-close fa-lg mt-1"/><br/>
          </td>
        </tr>
        }
        {this.state.hidden &&
        <tr>
          <td colSpan="8" style={{"textAlign": "center"}}>
            <i style={{cursor: "pointer"}} onClick={this.handleShow}
               className="right fa fa-plus fa-lg mt-1"/>
          </td>
        </tr>
        }
      </React.Fragment>
    );
  }

}

export default FieldInsertDialog
