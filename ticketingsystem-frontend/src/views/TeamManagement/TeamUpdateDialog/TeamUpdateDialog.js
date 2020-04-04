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

class TeamUpdateDialog extends Component {
  constructor(props) {
    super(props);


	      this.loadingHandler = this.loadingHandler.bind(this);

    this.toggle = this.toggle.bind(this);
    this.state = {
	    loading: true,
      collapse: true,
      fields: []
    };

    //alert(this.props.attributes);

    this.handleUpdate = this.handleUpdate.bind(this);

  }

  loadingHandler=()=> {
	 // console.log("CIAO");
    this.setState({
      loading: false
    });
  }

  toggle = () => {
    //this.setState({ collapse: !this.state.collapse });
    this.setState({
      modal: !this.state.modal
    });
  }

  handleUpdate = (e) => {
  e.preventDefault();
    var updatedTeam = {};

    this.props.teamFields.forEach(attribute => {
      if (attribute[5] != "not_editable")
        updatedTeam[attribute[0]] = ReactDOM.findDOMNode(this.refs[attribute[0]]).value.trim();
      if (attribute[6] == "radio" && attribute[1] == "ref"){ //not dynamic, probably not needed
	//TODO then
	var ref = {};
        ref.id=this.child.selectedRadio;
        ref.ref=attribute[7];
	updatedTeam.teamLeader=ref;
	//console.log(updatedTeam);
      }
      if (attribute[6] == "checkbox" && attribute[1] == "array_ref"){ //not dynamic, probably not needed
	var array_ref = [];

	this.child.selectedCheckboxes.forEach(userid => {
		//TODO then
		var ref={};
  		ref.id=userid;
       		ref.ref=attribute[7];
		array_ref = array_ref.concat(ref);
	 	//console.log(array_ref);


	})
	updatedTeam.teamMembers=array_ref;
	console.log(updatedTeam);
	console.log(this.child.selectedCheckboxes);

	
      }
	
    });

    this.props.onUpdate(this.props.team, updatedTeam);


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
        var inputs = this.props.teamFields.map(attribute => {
        if ((!this.state.loading)&&((attribute[1] == "text" || attribute[1] == "password") && attribute[5] == "editable" && attribute[6] != "select"))
          return (
            <FormGroup key={attribute[0]}>
              <Label htmlFor={attribute[0]}>{attribute[2]}</Label>
              <Input ref={attribute[0]} type={attribute[1]} id={attribute[0]} name={attribute[0]}
                     placeholder={attribute[2]} autoComplete="on" defaultValue={this.props.team[attribute[0]]} className="form-control-success" required/>
              <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
            </FormGroup>
          );
        else if ((!this.state.loading)&&((attribute[1] == "text" || attribute[1] == "password") && attribute[5] == "editable" && attribute[6] == "select")){

        let selectOptions = this.props.selectField[attribute[0]].map(role =>
                <option key={role} value={role}>{role}</option>
        );

        return (
           <FormGroup key={attribute[0]}>
             <Label htmlFor={attribute[0]}>{attribute[2]}</Label>
             <Input ref={attribute[0]} type={attribute[6]} name={attribute[0]} id={attribute[0]} defaultValue={this.props.team[attribute[0]]} requiredi>
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


  <Button className="float-right" onClick={this.toggle}>
        Create User
      </Button>
     */
    return(
<div>
          <i style={{cursor:"pointer"}} onClick={(e) => this.toggle()} className="fa fa-pencil fa-lg mt-1"></i><br />


<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} /* size="lg"*/>
  <ModalHeader toggle={this.toggle}><strong>Insert</strong> Team</ModalHeader>

    <ModalBody>
      <div className="animated fadeIn">
        <Card>
          <Form onSubmit={this.handleUpdate} className="was-validated">
  
            <CardBody>
              {inputs}
            </CardBody> 
        
                 <UserList     ref={(node) => { this.child = node; }}
           teamid={this.props.team.id} loadingHandler={this.loadingHandler} /*selectedCheckboxes={this.props.selectedCheckboxes} selectedRadio={this.props.selectedRadio} 
              handleOptionChange={this.handleOptionChange} toggleCheckbox={this.props.toggleCheckbox}
            handlerSelectedCheckboxes={this.props.handlerSelectedCheckboxes} handlerSelectedRadio={this.props.handlerSelectedRadio}*/
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



 //    <span className="paddingRightClass" styles={{float : 'left', paddingRight : '5px'}} > </span>
   //                     <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>

export default TeamUpdateDialog;
