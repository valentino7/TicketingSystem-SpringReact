import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  validateLoginForm,
  validatePasswordField,
  validateUsernameField
} from "../../../util/FieldValidator";
import BackgroundImage from 'react-background-image-loader';
import bg from '../../../assets/img/sfondo.png';
import logo from '../../../assets/img/ticket.png';

class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: "",
        password: "",
      },
      submitted: false
    };

    /* Bindings */
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    if (validateLoginForm(user.username, user.password)) {
      //this.props.setLoggingInFlag();  // mark status as registering to show a button animation
      this.props.login(user.username, user.password);
    }
  }

  render() {
    const { submitted, user } = this.state;
    const { loggingIn } = this.props;

    return (
      <BackgroundImage placeholder={bg} >
        <div className="app flex-row align-items-center" >
            <Container>
            <Row className="justify-content-center">
                <span><img  style={{width:'100px'}} src={logo}  /></span>
            </Row>

            <Row className="justify-content-center">
              <h4 style={{color:"white"}}><strong >Ticketing System</strong></h4>
            </Row>

            <Row className="justify-content-center">
              <div className="description">
                <p style={{color:"white"}}>
                  Welcome to - Ticketing System!
                </p>
              </div>
            </Row>

            <br/>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <Form name="form" onSubmit={this.handleSubmit}>
                      <CardBody>
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input invalid={submitted && !validateUsernameField(user.username)} valid={submitted && validateUsernameField(user.username)} type="text" placeholder="Username" name="username" value={user.username} onChange={this.handleChange} />
                          <FormFeedback >Please provide a valid information</FormFeedback>
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input invalid={submitted && !validatePasswordField(user.password)} valid={submitted && validatePasswordField(user.password)} type="password" placeholder="Password" name="password" value={user.password} onChange={this.handleChange} />
                          <FormFeedback >Please provide a valid information</FormFeedback>
                        </InputGroup>
                        <Row>
                        <Button type="submit" color="primary" className="px-4" block>
                          <div className={loggingIn ? "btn btn-default ld-ext-right running" : "btn btn-default ld-ext-right"}>Login
                            {loggingIn &&
                            <div align="right" className="ld ld-ring ld-spin" />
                            }
                          </div>
                        </Button>
                        </Row>
                      </CardBody>
                    </Form>
                  </Card>
                  <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                    <CardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>New to Ticketing system?</p>
                        <Link to="/register"><Button color="primary" className="mt-3" active>Register Now!</Button></Link>
                      </div>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </BackgroundImage>
  );
  }
}

export default LoginPage;

