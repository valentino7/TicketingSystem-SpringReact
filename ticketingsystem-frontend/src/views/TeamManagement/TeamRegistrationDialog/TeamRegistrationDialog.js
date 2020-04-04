import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import UserList from "../UserList";
import axios from "axios/index";

class TeamRegistrationDialog extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: true,
      fields: []
    };

    //alert(this.props.attributes);

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  toggle = () => {
    //this.setState({ collapse: !this.state.collapse });
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSubmit = (e) => {
  e.preventDefault();
    var newTeam = {};

    this.props.teamFields.forEach(attribute => {
      if (attribute[5] != "not_editable")
        newTeam[attribute[0]] = ReactDOM.findDOMNode(this.refs[attribute[0]]).value.trim();
      if (attribute[6] == "radio" && attribute[1] == "ref"){ //not dynamic, probably not needed
	var ref = {};
        ref.id=this.child.selectedRadio;
        ref.ref=attribute[7];
	newTeam.teamLeader=ref;
      }
      if (attribute[6] == "checkbox" && attribute[1] == "array_ref"){ //not dynamic, probably not needed
	var array_ref = [];

	      this.child.selectedCheckboxes.forEach(userid => {
	      	var ref = {};
  		ref.id=userid;
       		ref.ref=attribute[7];
		array_ref=array_ref.concat(ref);

	})

	newTeam.teamMembers=array_ref;
      }


    });

    this.props.onCreate(newTeam);

    this.toggle();

    //this.props.refreshList()
  }


/*
  render() {
    var inputs = this.props.attributes.map(attribute =>
      <FormGroup key={attribute}>
        <Label htmlFor={attribute}>{attribute}</Label>
        <Input ref={attribute} type="text" id={attribute} name={attribute} placeholder={attribute} autoComplete="on"/>
        <FormText className="help-block">{attribute}</FormText>
      </FormGroup>
    );
*/


  render() {
    let inputs = this.props.teamFields.map(attribute => {
      if ((attribute[1] == "text" || attribute[1] == "password") && attribute[5] == "editable" && attribute[6] != "select")
        return (
          <FormGroup key={attribute[0]}>
            <Label htmlFor={attribute[0]}>{attribute[2]}</Label>
            <Input ref={attribute[0]} type={attribute[1]} id={attribute[0]} name={attribute[0]} placeholder={attribute[3]}
                   autoComplete="on" className="form-control-success" required/>
            <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
          </FormGroup>
        );
	else if ((attribute[1] == "text" || attribute[1] == "password") && attribute[5] == "editable" && attribute[6] == "select"){

    	let selectOptions = this.props.selectField[attribute[0]].map(options =>
      		<option key={options} value={options}>{options}</option>
    	);

        return (
           <FormGroup key={attribute[0]}>
	     <Label htmlFor={attribute[0]}>{attribute[2]}</Label>
             <Input ref={attribute[0]} type={attribute[6]} name={attribute[0]} id={attribute[0]} required >
		<option value="" hidden="true">Please choose</option>
                        {selectOptions}
                </Input>
                <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
              </FormGroup>

        );
	}

      }
    );

    /*
  text-align: center;


  <Button className="float-right" onClick={this.toggle}>
        Create User
      </Button>
     */
    return (


<div>
  <i style={{cursor:"pointer"}} onClick={(e) => this.toggle()} className="float-right fa fa-plus-square fa-lg mt-4"></i><br />

<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">
  <ModalHeader toggle={this.toggle}><strong>Insert</strong> Team</ModalHeader>

    <ModalBody>

      <div className="animated fadeIn">
        <Card>
          <Form onSubmit={this.handleSubmit} className="was-validated">
            <CardBody>
              {inputs}
            </CardBody>
	   	<UserList ref={(node) => { this.child = node; }}
	    />
            <CardFooter>
              <Button size="sm" color="primary" type="submit"><i className="fa fa-dot-circle-o"></i> Submit</Button>
            </CardFooter>
          </Form>
        </Card>
      </div>
  </ModalBody>
  </Modal>



</div>
    );
  }
}

//               <span className="paddingRightClass" styles={{float : 'left', paddingRight : '5px'}} > </span>
  //            <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>


export default TeamRegistrationDialog;
