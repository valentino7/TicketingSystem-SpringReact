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
  Input,
  Label,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback,
  Alert,
} from 'reactstrap';

import {
  URL_GET_ALL_TARGETS,
  URL_GET_ADDS_FIELDS,
  URL_INSERT_FILE,
  URL_CREATE_TICKET
} from '../../../_constants/configurationConstants';


const Fields = [
  /* ID, Type, Placeholder */
  ["Object", "object", "text", "Enter Object.."],
  ["Description", "description", "textarea", "Enter description.."],

];


class CreateTicket extends Component{

  constructor() {
    super();

    this.initialState = {

      ticket :{},
      mustShowSomething : false,
      selectedTarget: '',
      additionalFieldsValue :[],
      modalSuccess:false,
      targets:[],
      typology:[],
      fieldsValue:[],
      notFound : false,
      typId : 0,
      typIndex : 0 ,
    };
    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.initTicket = this.initTicket.bind(this);
    this.handleChangeTarget = this.handleChangeTarget.bind(this);
    this.showTicketAdditionalFields = this.showTicketAdditionalFields.bind(this);
    this.readTarget = this.readTarget.bind(this);
    this.readAdditionalFields = this.readAdditionalFields.bind(this);
    this.calculateTarget = this.calculateTarget.bind(this);
    this.hideAllFields = this.hideAllFields.bind(this);
    this.checkValidating = this.checkValidating.bind(this);
    this.calculateTypIndex = this.calculateTypIndex.bind(this);

    this.initTicket();
  }

  initTicket(){
    Fields.map ( f =>
      this.state.ticket[f[1]] = "",
    );
    this.state.ticket["state"] = "open";
    this.state.ticket["timestamp"] = 0;
    this.state.ticket["attachment"] = '';

    this.state.ticket["source"] = {
      "id" : "5b2a2c5a6ff38e05c0e253f4",
      "ref" : 'user'
    };
    this.state.ticket["target"] = {
      "id" : '',
      "ref" : 'target'
    };
    this.state.ticket["assegnee"] = {
      "id" : "5b2a2c5a6ff38e05c0e253f4",
      "ref" : 'user'
    };
    this.state.ticket["customerPriority"] = 0;
    this.state.ticket["visibility"] = false;
    this.state.ticket["additionalFieldsValue"] = [];

  }

  readTarget(){
    fetch(URL_GET_ALL_TARGETS, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then(res => {
        this.setState({targets: res });
      });
  }


  readAdditionalFields(){
    //let URLFields = "http://35.239.133.8:8081/ticketingsystem/system/configuration/getTicketTypology/";
    fetch(URL_GET_ADDS_FIELDS, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then(res => {
        console.log(res);
        let v = [];

        for ( let i = 0 ; i< res.length ; i++){
          let f = res[i].additionalFields;

          v[i] = {
            "id": res[i].id,
            "fields" :[],
            "visibility" : false
          };

          for ( let j = 0 ; j < f.length ; j++) {
            let temp = {
              "fdl": f[j],
              "validity": true
            };
            v[i]["fields"].push(temp);
          }
        }
        console.log(v);
        this.setState({typology : v});
        console.log(this.state.typology);
      })
      .catch( (error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.readTarget();
    this.readAdditionalFields();
  }

  toggleSuccess() {
    this.setState({
      modalSuccess: !this.state.modalSuccess
    });
  }

  handleChange (evt) {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({ ticket : {
        ...this.state.ticket,
      [evt.target.name]: evt.target.value
      }
    });
  }

  calculateTarget(id){
    this.state.targets.map ( t => {
      if (t.id === id) {
        this.state.typId= t.typId;
      }
    });
  }

  calculateTypIndex(id){
    this.state.typology.map ( (f,index) => {
      if ( f.id === id ) {
        this.state.typIndex = index;
      }
    });
  }

  handleChangeTarget(evt){
    this.hideAllFields();
    this.calculateTarget(evt.target.value);
    if ( this.state.typId === 0) {
      this.state.mustShowSomething = false;
    }else {
      for ( let i = 0 ; i< this.state.typology.length ; i++){
        if ( this.state.typology[i].id === this.state.typId){
         //console.log(this.state.typology[i]);
          if ( evt.target.value === ""){
            this.state.mustShowSomething = false;
          }
          else {
            this.state.typology[i].visibility = true;
            this.state.mustShowSomething = true;
          }

        }
      }
    }

    this.setState({ ticket : {
        ...this.state.ticket,
       [evt.target.name] :  {
          "id" : evt.target.value
        }
      }
    });
  }



  handleClick(e) {
    e.preventDefault();
    this.calculateTypIndex(this.state.typId);
    for ( let k = 0 ; k < this.state.typology[this.state.typIndex]["fields"].length; k++){
      if (!this.state.typology[this.state.typIndex]["fields"][k]["validity"] ){
        return;
      }
    }
    if(  document.getElementById('input').files.length !== 0 ) {
      let selectedFile = document.getElementById('input').files[0];
      this.state.ticket["attachment"] = selectedFile.name;
      const data = new FormData();
      //let url= 'http://35.239.133.8:8081/ticketingsystem/ticket/uploadFiles';
      data.append("files", selectedFile);
      fetch(URL_INSERT_FILE + this.props.user.username, {
        method: 'POST',
        body: data
      });
    }else {
      this.state.input = null;
    }
    this.state.ticket["timestamp"] = new Date().getTime();
    //let URL= 'http://35.239.133.8:8081/ticketingsystem/ticket';
    fetch(URL_CREATE_TICKET, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.ticket)
    })
      .then( (response)=> {
        if (response.ok) {
          this.toggleSuccess();
        }

      });

    this.Reset();

  }
  Reset(){
    this.initTicket();
  }

  fieldsChange(i,addfield,index,e){

    console.log("i :",i);
    console.log("index :",index);

    let re = new RegExp(addfield["fdl"]);
   // console.log("check val", re.test(e.target.value));
    if ( re.test(e.target.value) ) {
      this.state.ticket["additionalFieldsValue"][index] = {
        "value": e.target.value,
        "additionalFieldRef": {
          "id": e.target.id,
        }
      };

     this.state.typology[i]["fields"][index]["validity"] = true;
     this.setState(this.state);
    } else {
      this.state.typology[i]["fields"][index]["validity"] = false;
      this.setState(this.state);
    }
  }

  hideAllFields(){
    for(let i=0; i<this.state.typology.length; i++){
      this.state.typology[i].visibility = false;
    }

  }

  checkValidating(i,index){
    //console.log(this.state.typology[i]["fields"][index]["validity"]);
    if (!this.state.typology[i]["fields"][index]["validity"]) {
        return (
          <Alert color="danger">
            Please provide a valid information
          </Alert>
        );
    }

  }

  showTicketAdditionalFields(){

    if(this.state.mustShowSomething === true){
      for(let i=0; i<this.state.typology.length; i++){
        if(this.state.typology[i].visibility === true){
          return this.state.typology[i].fields.map( (ad,index) => {
            return (
              <FormGroup row>
                <Col >
                  <Label>{ad["fdl"].name}</Label>
                  <Input key={i} type={ad["fdl"].ref.type} name={ad["fdl"].name} placeholder={ad["fdl"].placeholder}  value={this.state.additionalFieldsValue[i]} onChange={this.fieldsChange.bind(this,i,ad,index)} required >
                  </Input>
                  {this.checkValidating(i,index)}
                </Col>

              </FormGroup>
            )}
          );
        }
      }
    }

  }


  render(){

    let predefiniteInputField = Fields.map( field =>
      <FormGroup key={field[0]}>
        <Label >{field[0]}</Label>
        <Input ref={field[0]} type={field[2]} id={field[0]} name={field[1]} placeholder={field[3]}
               autoComplete="on" className="form-control-success" value={this.state.ticket[field[1]]} onChange={this.handleChange} required/>
        <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
      </FormGroup>
    );

    let targetOptions = this.state.targets.map( (t,index) =>
      <option key={index} value={t.id}>{t.name}</option>
    );

    return (

      <Row>

        <Modal isOpen={this.state.modalSuccess} toggle={this.toggleSuccess} >
          <ModalHeader toggle={this.toggleSuccess}>Success</ModalHeader>
          <ModalBody>
            Request submitted
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleSuccess}>ok</Button>{' '}
          </ModalFooter>
        </Modal>



        <Col>
          <Card>
            <CardHeader>
              <i className="fa fa-ticket fa-lg mt-1"/>    <strong>Create Ticket</strong>
            </CardHeader>
            <Form onSubmit={this.handleClick.bind(this)} encType="multipart/form-data" className="form-horizontal">
            <CardBody>
              <FormGroup row>
                <Col >
                     <Label>Target</Label>
                     <Input type="select" name="target" id="select1" value={this.state.ticket["target"]["id"]} onChange={this.handleChangeTarget} required>
                       <option value="">Please select</option>
                       {targetOptions}
                     </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col >
              <Label>Priority</Label>
              <Input type="select" name="customerPriority" id="select" value={this.state.ticket["customerPriority"]}  onChange={this.handleChange} required>
                <option value="">Please select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Input>
                </Col>
              </FormGroup>
              {predefiniteInputField}
              {this.showTicketAdditionalFields()}
              <FormGroup >
                <Input type="file" id="input" name="attachment" onChange={this.handleChange} />
              </FormGroup>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="md" color="primary">Submit</Button>
              <Button onClick={this.Reset.bind(this)} type="reset" size="md" color="danger">Reset</Button>
            </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default CreateTicket;
