import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Row
} from 'reactstrap';

import { DEBUG_EDITPROFILE_LIFECYCLE } from "../../_constants/debugConstants";
import {validateRegistrationForm} from "../../util/FieldValidator";

import { history } from '../../_helpers/history';

const internalRoles = ["System-Administrator", "Team leader", "Team member", "Team coordinator"];
const externalRoles = ["Administrator", "Customer", "Desk operator"];


class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      confirmPassword: ''
    };

    /* Binding */
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.resetFields = this.resetFields.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  /* Invoked while filling the form */
  /* User's informations are continuously updated */
  handleChange(event) {
    const { name, value } = event.target;

    if (name === 'confirmPassword') {
      this.setState({
        [name]: value
      });
    }
    else {
      const { user } = this.state;
      this.setState({
        user: {
          ...user,
          [name]: value
        }
      });
    }
  }

  /* Invoked on update action */
  handleUpdate(event) {
    event.preventDefault(); // Prevent default behaviour

    const { user, confirmPassword } = this.state;
    if (validateRegistrationForm(user.name, user.surname, user.email, user.username, user.password, confirmPassword)) {
      /* Update user */
      this.props.updateUser(this.state.user.id, this.state.user);
    }
  };

  /*
  resetFields(event) {
    event.preventDefault();

    this.setState({
      user: this.props.user
    });
  }
  */

  handleCancel(event) {
    event.preventDefault();

    history.push('/');
  }

  componentWillMount() {
    if (DEBUG_EDITPROFILE_LIFECYCLE)
      alert("EditProfile will mount");
  }

  componentDidMount() {
    if (DEBUG_EDITPROFILE_LIFECYCLE)
      alert("EditProfile:  did mount");
  }

  componentWillUpdate(nextProps) {
    if (DEBUG_EDITPROFILE_LIFECYCLE)
      alert("EditProfile:  will update");
  }

  componentDidUpdate() {
    if (DEBUG_EDITPROFILE_LIFECYCLE)
      alert("EditProfile:  did update");
  }

  componentWillUnmount() {
    if (DEBUG_EDITPROFILE_LIFECYCLE)
      alert("EditProfile:  will unmount");
  }

  /* Render the component */
  render() {
    if (DEBUG_EDITPROFILE_LIFECYCLE)
      alert("EditProfile:  will render");


    const { user, confirmPassword } = this.state;


    const internalRolesOptions = internalRoles.map(role =>
      <option key={role} value={role}>{role}</option>
    );

    const externalRolesOptions = externalRoles.map(role =>
      <option key={role} value={role}>{role}</option>
    );


    return (
      <React.Fragment>
        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" /> Edit User Profile
            </CardHeader>
            <Form onSubmit={this.handleUpdate} className="was-validated">
              <CardBody>
                <FormGroup key="roles">
                <Label htmlFor="role">Role: </Label>
                  <Input disabled ref="role" type="select" name="role" id="role" value={user.role} onChange={this.handleChange} required>
                    <option value="" disabled>Please select a role</option>
                    {internalRolesOptions}
                    {externalRolesOptions}
                  </Input>
                </FormGroup>
                <Row>
                  <Col>
                    <FormGroup float="left">
                      <Label htmlFor="name">Name</Label>
                      <Input type="text"
                             id="name" name="name"
                             placeholder="Enter name.." autoComplete="on"
                             value={user.name} className="form-control-success"
                             onChange={this.handleChange}
                             required
                      />
                      <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup float="left">
                      <Label htmlFor="surname">Surname</Label>
                      <Input type="text"
                             id="surname" name="surname"
                             placeholder="Enter surname.." autoComplete="on"
                             value={user.surname} className="form-control-success"
                             onChange={this.handleChange}
                             required
                      />
                      <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="email">Email</Label>
                      <Input type="email"
                             id="text" name="email"
                             placeholder="Enter email.." autoComplete="on"
                             value={user.email} className="form-control-success"
                             onChange={this.handleChange}
                             required
                      />
                      <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="username">Username</Label>
                      <Input disabled type="text"
                             id="username" name="username"
                             placeholder="Enter username.." autoComplete="on"
                             value={user.username} className="form-control-success"
                             onChange={this.handleChange}
                             required
                      />
                      <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="password">Password</Label>
                      <Input type="password"
                             id="password" name="password"
                             placeholder="Enter password.." autoComplete="on"
                             value={user.password} className="form-control-success"
                             onChange={this.handleChange}
                             required
                      />
                      <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="password">Confirm Password</Label>
                      <Input type="password" name="confirmPassword"
                             placeholder="Confirm password.." autoComplete="on"
                             value={confirmPassword} className="form-control-success"
                             onChange={this.handleChange}
                             required
                      />
                      <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Row>
                  <Col md="1">
                    <Button size="sm" color="primary" type="submit"><i className="fa fa-dot-circle-o" /> Update</Button>
                  </Col>
                  <Col>
                    <Button type="button" onClick={this.handleCancel} size="sm" color="danger"><i className="fa fa-ban" /> Cancel</Button>
                  </Col>
                </Row>
              </CardFooter>
            </Form>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default EditProfile;
