import React, { Component } from 'react';
import{
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';



class ModalConfirm extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }


  handleDelete(){
    this.props.handleDelete();
  }



  render() {
    return(
      <React.Fragment>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>
            <strong>Confirm Delete</strong>
          </ModalHeader>
          <ModalBody>
            Are you sure you want to delete this?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
            <Button color="danger" onClick={this.handleDelete}>Confirm Delete</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}
export default ModalConfirm;
