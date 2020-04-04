import React, { Component } from 'react';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { validateRegistrationForm, validateField } from "../../../util/FieldValidator";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      editable: false,
      updatedUser: {}
    };

    /* Binding */
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditable = this.handleEditable.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.initUser = this.initUser.bind(this);
    this.toggle = this.toggle.bind(this);

    this.initUser();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  initUser() {
    //console.log(this.props.user);
    this.props.fields.forEach(field => {
        this.state.updatedUser[field[0]] =  this.props.user[field[0]];
      }
    );

    this.state.updatedUser['role'] = this.props.user['role'];
  }

  handleEditable(event) {
    event.preventDefault();

    this.setState({ editable: true });
  }

  /* Invoked on submit action */
  handleSubmit(event) {
    event.preventDefault(); // Prevent default behaviour

    const { updatedUser } = this.state
    if (validateRegistrationForm(updatedUser.name, updatedUser.surname, updatedUser.email, updatedUser.role, updatedUser.username, updatedUser.password, updatedUser.password)) {
      /* Create a new user */
      this.props.updateUser(this.props.index, this.props.id, this.state.updatedUser);
      //this.setState({ hidden: true });
      this.setState({editable: false});
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      updatedUser: {
        ...this.state.updatedUser,
        [name]: value
      }
    });
  }

  handleCancel(event) {
    event.preventDefault();

    this.setState({ editable: false });
    this.initUser();
  }

  /* Invoked when a user is deleted */
  handleDelete() {
    this.props.deleteUser(this.props.index, this.props.id); // Delete user
    this.toggle();
  }

  /* Render the component */
  render() {

    /* Render table rows corresponding to header fields */
    let tableRows = this.props.fields.map(field =>
      (field[0] === 'password') ? <td key={field[0]}>*******</td> :
        (this.state.editable) ?
          <td key={field[0]}>
            <Input invalid={!validateField(field[0], this.state.updatedUser[field[0]])} valid={validateField(field[0], this.state.updatedUser[field[0]])} bsSize="sm" name={field[0]} type={field[2]} onChange={this.handleChange} value={this.state.updatedUser[field[0]]} required />
          </td> :
          <td key={field[0]}>{this.state.updatedUser[field[0]]}</td>

            /* ALTERNATIVE
      (this.state.editable && field[0] !== 'password') ?
        <td key={field[0]}>
          <Input bsSize="sm" name={field[0]} type={field[2]} onChange={this.handleChange} value={this.state.updatedUser[field[0]]} />
        </td> :
        field[0] !== 'password' ? <td key={field[0]}>{this.props.user[field[0]]}</td> :
          <td key={field[0]}>********</td>
          */
    );

    const internalRoles = this.props.internalRoles.map(role =>
      <option key={role} value={role}>{role}</option>
    );

    const externalRoles = this.props.externalRoles.map(role =>
      <option key={role} value={role}>{role}</option>
    );

    return(
      <React.Fragment>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <strong>Confirm Delete</strong>
          </ModalHeader>
          <ModalBody>
            Are you sure you want to delete this?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            <Button color="danger" onClick={this.handleDelete}>Confirm Delete</Button>
          </ModalFooter>
        </Modal>
        <tr>
          <td><b>{this.props.index + 1}</b></td>
          {tableRows}
          <td>
          <Input disabled={!this.state.editable} invalid={this.state.editable && !validateField('role', this.state.updatedUser['role'])} valid={this.state.editable && validateField('role', this.state.updatedUser['role'])} bsSize="sm" ref="role" type="select" name="role" id="role" defaultValue="" value={this.state.updatedUser["role"]} onChange={this.handleChange} >
            <option value="" disabled >Please select a role</option>
            {internalRoles}
            {externalRoles}
          </Input>
          </td>
          <td>
            {this.state.editable ?
              <i style={{cursor: "pointer"}} onClick={this.handleSubmit} className="fa fa-check fa-lg mt-1"/> :
              <i style={{cursor:"pointer"}} onClick={this.handleEditable} className="fa fa-pencil fa-lg mt-1" />
            }
          </td>
          <td>
            {this.state.editable ?
              <i style={{cursor: "pointer"}} onClick={this.handleCancel} className="fa fa-close fa-lg mt-1"/> :
              <i style={{cursor:"pointer"}} onClick={this.toggle} className="fa fa-trash-o fa-lg mt-1" />
            }
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default User;
