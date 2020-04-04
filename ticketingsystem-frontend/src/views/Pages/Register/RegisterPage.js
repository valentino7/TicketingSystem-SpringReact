import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import bg from '../../../assets/img/sfondo.png';
import BackgroundImage from 'react-background-image-loader';

import {
  validateConfirmPasswordField,
  validateEmailField,
  validateRegistrationForm,
  validateNameField,
  validatePasswordField,
  validateSurnameField,
  validateUsernameField
} from '../../../util/FieldValidator'

const role = "Customer";

class RegisterPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: "",
        surname: "",
        email:"",
        username: "",
        password: "",
        role: role
      },
      submitted: false,
      confirmPassword: ""
    };

    /* Bindings */
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /* Invoked while filling the form */
  /* User's informations are continuously updated */
  handleChange(event) {
    const { name, value } = event.target;
    if (name !== "confirmPassword") {
      const {user} = this.state;
      this.setState({
        user: {
          ...user,
          [name]: value
        }
      });
    } else
      this.setState({ [name]: value });
  }

  /* Invoked on form submit */
  /* Send a request of registration to container component */
  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });  // mark status as submitted to enable field validation

    const { user, confirmPassword } = this.state;
    if (validateRegistrationForm(user.name, user.surname, user.email, user.role, user.username, user.password, confirmPassword)) {
      //this.props.setRegisteringFlag();  // mark status as registering to show a button animation
      this.props.register(user);
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted, confirmPassword } = this.state;

    return (
      <BackgroundImage placeholder={bg} >
        <div className="app align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="6">
                <Card className="mx-4">
                  <Form name="form" onSubmit={this.handleSubmit}>
                    <CardBody className="p-4">
                      <h1>Register</h1>
                      <p className="text-muted">Create your account</p>
                      <FormGroup className="mb-3">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend" style={{width:"30%"}}>
                            <InputGroupText style={{width:"100%"}}>
                                <i>Name</i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input invalid={submitted && !validateNameField(user.name)}
                                 valid={submitted && validateNameField(user.name)} type="text" placeholder="Name"
                                 className="form-control-success" name="name" value={user.name}
                                 onChange={this.handleChange}/>
                          <FormFeedback>Please provide a valid information</FormFeedback>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" style={{width:"30%"}}>
                              <InputGroupText style={{width:"100%"}}>
                                <i>Surname</i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input invalid={submitted && !validateSurnameField(user.surname)}
                                 valid={submitted && validateSurnameField(user.surname)} type="text" placeholder="Surname"
                                 className="form-control-success" name="surname" value={user.surname}
                                 onChange={this.handleChange}/>
                          <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                        </InputGroup>
                        <FormFeedback>Please provide a valid information</FormFeedback>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend" style={{width:"30%"}}>
                              <InputGroupText style={{width:"100%"}}>
                                <i>e-mail</i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input invalid={submitted && !validateEmailField(user.email)}
                                 valid={submitted && validateEmailField(user.email)} type="text" placeholder="Email"
                                 className="form-control-success" name="email" value={user.email}
                                 onChange={this.handleChange}/>
                          <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                        </InputGroup>
                        <FormFeedback>Please provide a valid information</FormFeedback>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend" style={{width:"30%"}}>
                              <InputGroupText style={{width:"100%"}}>
                                <i>Username</i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input invalid={submitted && !validateUsernameField(user.username)}
                                 valid={submitted && validateUsernameField(user.username)} type="text" placeholder="Username"
                                 className="form-control-success" name="username" value={user.username}
                                 onChange={this.handleChange}/>
                          <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                        </InputGroup>
                        <FormFeedback>Please provide a valid information</FormFeedback>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend" style={{width:"30%"}}>
                              <InputGroupText style={{width:"100%"}}>
                                <i>Password</i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input invalid={submitted && !validatePasswordField(user.password)}
                                 valid={submitted && validatePasswordField(user.password)} type="password" placeholder="Password"
                                 className="form-control-success" name="password" value={user.password}
                                 onChange={this.handleChange}/>
                          <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                        </InputGroup>
                        <FormFeedback>Please provide a valid information</FormFeedback>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend" style={{width:"30%"}}>
                              <InputGroupText style={{width:"100%"}}>
                                <i>Confirm Password</i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input invalid={submitted && !validateConfirmPasswordField(user.password, confirmPassword)}
                                 valid={submitted && validateConfirmPasswordField(user.password, confirmPassword)} type="password"
                                 placeholder="Repeat password" className="form-control-success" name="confirmPassword"
                                 value={confirmPassword} onChange={this.handleChange}/>
                          <FormFeedback className="help-block">Password mismatched</FormFeedback>
                        </InputGroup>
                      </FormGroup>
                    </CardBody>
                    <CardFooter className="p-4">
                      <Button color="success" type="submit" block>
                        <div
                          className={registering ? "btn btn-default ld-ext-right running" : "btn btn-default ld-ext-right"}>Create
                          Account
                          {registering &&
                          <div align="right" className="ld ld-ring ld-spin" />
                          }
                        </div>
                      </Button>
                      <p>Already have a Ticketing System account? <Link to="/login">Log in here</Link></p>
                    </CardFooter>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </BackgroundImage>
    );
  }
}

export default RegisterPage;

