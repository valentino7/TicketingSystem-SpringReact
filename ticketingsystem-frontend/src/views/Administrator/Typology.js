import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Table,
  Col,
  Collapse,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import Field from "./Field";
import NewField from './FieldInsertDialog.js'

import {
  URL_ADD_FIELD_TO_TYPOLOGY,
  URL_DELETE_FIELD_TO_TYPOLOGY,
} from '../../_constants/configurationConstants';

const Fields = [
  ["Name", "name", "text", "Enter Name.."],
  ["Placeholder","placeholder", "text", "Enter Placeholder.."],
  ["Regular Expression","regularExp", "text", "Enter Regular Expression.."]
];


class Typology extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
    };
    this.toggle= this.toggle.bind(this);
    this.addField= this.addField.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteField = this.deleteField.bind(this);
  }

  toggle(){
    this.setState({
      collapse: !this.state.collapse
    });
  }


  addField(field){
    //let url= 'http://35.239.133.8:8081/ticketingsystem/system/configuration/addTypologyAdditionalField/'+this.props.typology.id;
    fetch(URL_ADD_FIELD_TO_TYPOLOGY+this.props.typology.id, {
      method: 'POST',
      body: JSON.stringify(field),
      headers: {
        'Content-Type': 'application/json'
      },

    }).then( (response)=> {
      if (response.ok) {
        this.props.read();
      }

    });

  }



  deleteField(idField){
    //let URLDelete = "http://35.239.133.8:8081/ticketingsystem/system/configuration/deleteAdditionalField/"+this.props.typology.id+"/"+idField;
    fetch(URL_DELETE_FIELD_TO_TYPOLOGY+this.props.typology.id+"/"+idField, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },

    }).then( (response)=> {
      if (response.ok) {
        this.props.read();
      }
    });
  }

  handleChange(evt){
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {

    let fields = this.props.typology.additionalFields.map ( (f, index) =>
      <Field key={f.id} f={f} id={index+1} editableFields={Fields} defaultFields={this.props.defaultFields} deleteField={this.deleteField} />
    );

    return (


        <CardBody>
          <Table>
            <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Placeholder</th>
              <th>Regular Expression</th>
              <th>Type</th>
              <th>Delete</th>

              <th></th>
            </tr>
            </thead>
            <tbody>
              {fields}
              <NewField fields={Fields} defaultFields={this.props.defaultFields} createField={this.addField} />
            </tbody>
          </Table>

        </CardBody>



    );

  }


}

export default Typology
