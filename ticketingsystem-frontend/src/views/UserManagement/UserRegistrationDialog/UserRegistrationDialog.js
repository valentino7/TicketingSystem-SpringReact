import React, { Component } from 'react';
import { Input } from 'reactstrap';
import {validateField, validateRegistrationForm} from "../../../util/FieldValidator";


class UserRegistrationDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      user: {}
    };

    /* Binding */
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.initUser = this.initUser.bind(this);

    this.initUser();
  }

  initUser() {
    this.props.fields.forEach(field => {
        this.state.user[field[0]] = "";
      }
    );

    this.state.user["role"] = "";
  }

  /* Invoked on submit action */
  handleSubmit(event) {
    event.preventDefault(); // Prevent default behaviour

    const { user } = this.state;
    if (validateRegistrationForm(user.name, user.surname, user.email, user.role, user.username, user.password, user.password)) {
      /* Create a new user */
      this.props.createUser(this.state.user);
      this.props.selectLastPage();
      //this.setState({ hidden: true });
      this.initUser();
    }
  }

  handleCancel(event) {
    event.preventDefault();

    this.setState({ hidden: true });
    this.initUser();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    });
  }

  handleShow(event) {
    event.preventDefault();

    this.setState({ hidden: false });
  }

  /* Render the component */
  render() {

    /* Render table rows corresponding to header fields */
    let tableRows = this.props.fields.map(field =>
      <td key={field[0]}><Input invalid={!validateField(field[0], this.state.user[field[0]])} valid={validateField(field[0], this.state.user[field[0]])} bsSize="sm" name={field[0]} type={field[2]} placeholder={field[1]} onChange={this.handleChange} value={this.state.user[field[0]]}/></td>
    );

    const internalRoles = this.props.internalRoles.map(role =>
      <option key={role} value={role}>{role}</option>
    );

    const externalRoles = this.props.externalRoles.map(role =>
      <option diabled key={role} value={role}>{role}</option>
    );

    return(
      <React.Fragment>
        {!this.state.hidden &&
          <tr>
            <td />
            {tableRows}
            <td>
              <Input invalid={!validateField('role', this.state.user['role'])} valid={validateField('role', this.state.user['role'])} bsSize="sm" ref="role" type="select" name="role" id="role" defaultValue="" value={this.state.user["role"]} onChange={this.handleChange} >
                <option value="" disabled >Please select a role</option>
                {internalRoles}
                {externalRoles}
              </Input>
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
            <td colSpan="9" style={{textAlign: "center"}}>
              <i style={{cursor: "pointer"}} onClick={this.handleShow}
                 className="right fa fa-user-plus fa-lg mt-1"/>
            </td>
          </tr>
        }
      </React.Fragment>
    );
  }
}

export default UserRegistrationDialog;


