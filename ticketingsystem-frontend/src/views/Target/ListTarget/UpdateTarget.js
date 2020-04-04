import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import CreateTarget from '../AddTarget';

class UpdateTarget extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: true,
      name: this.props.target.name,
      version: this.props.target.version,
      category: this.props.target.category,
      typId : this.props.target.typId,
    };
    this.onChange = this.onChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleUpdate = (e) => {
    e.preventDefault();

    let updateTarget =[];
    updateTarget[0]= this.state.category;
    updateTarget[1]= this.state.name;
    updateTarget[2]= this.state.version;
    updateTarget[3]= this.state.typId;
    this.props.onUpdate(this.props.target, updateTarget);
    this.onChange = this.onChange.bind(this);

    this.toggle();
  };

  onChange(evt){
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {

    return (

      <div>
        <i style={{cursor:"pointer"}} onClick={this.toggle} className="fa fa-pencil fa-lg mt-1"/><br />
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><strong>Edit Target</strong></ModalHeader>
          <ModalBody>
            <div className="animated fadeIn">
              <Card>
                <Form onSubmit={this.handleUpdate} className="was-validated">
                  <CardBody>

                    <React.Fragment>
                      <Col md="9">
                            <CreateTarget {...this.state} typology={this.props.typology} onChange={this.onChange}   />
                      </Col>
                    </React.Fragment>

                  </CardBody>
                  <CardFooter>
                    <Button size="sm" color="primary" type="submit"><i className="fa fa-dot-circle-o"/> Update</Button>
                  </CardFooter>
                </Form>
              </Card>
            </div>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default UpdateTarget;
