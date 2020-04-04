import React from 'react'
import Typology from './Typology.js'


import {
    Col,
    Row,
  Button,
  Card,
  CardHeader,
} from 'reactstrap';

import {
  URL_GET_ADDS_FIELDS,
  URL_GET_DEFAULT_FIELDS,
  URL_DELETE_TYPOLOGY,
  URL_CREATE_TYPOLOGY,
} from '../../_constants/configurationConstants';

class Typologies extends React.PureComponent {
  constructor(props) {
      super(props);

    this.state = {
      values : [],
      defaultFields: [],
      typology : [],
      collapse : false,
    };
    this.addTypology = this.addTypology.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.read = this.read.bind(this);
  }

  componentDidMount(){
      this.read();


    }

  read() {
    //let URLTypology = "http://35.239.133.8:8081/ticketingsystem/system/configuration/getTicketTypology";
    fetch(URL_GET_ADDS_FIELDS, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then(res => {
        this.setState({typology: res });
      });
    //let URLFields = "http://35.239.133.8:8081/ticketingsystem/system/configuration/getTicketAdditionalFields";
    fetch(URL_GET_DEFAULT_FIELDS, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then(res => {
        this.setState({defaultFields: res });
      });


  }

  toggle(){
    this.setState({ collapse: !this.state.collapse });
    }

  handleChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  deleteTypology(id, evt){
    //let deleteTypologyUrl = 'http://35.239.133.8:8081/ticketingsystem/system/configuration/deleteTypology/'+id;
    fetch(URL_DELETE_TYPOLOGY+id, {
      method: 'DELETE',
    }).then( (response)=> {
      if (response.ok) {
        this.read();
      }
    });
  }

  addTypology(){
    let typology = {};
    typology["additionalFields"] = [];
    //let createTypologuUrl= 'http://35.239.133.8:8081/ticketingsystem/system/configuration/addTicketTypology';
    fetch(URL_CREATE_TYPOLOGY, {
      method: 'POST',
      body: JSON.stringify(typology),
      headers: {
        'Content-Type': 'application/json'
      },

    }).then( (response)=> {
      if (response.ok) {
        this.read();
      }

    });
  }

  render() {

      let visualizeTypology = this.state.typology.map( (t,index) =>
        <Col>
      <Card>
        <CardHeader>
          Typology of Additional Fields ID {t.id}
          <Button key={t.toString()} className="pull-right" onClick={this.deleteTypology.bind(this,t.id)}  type="submit" size="md" color="secondary"> Remove </Button>
        </CardHeader>
     <Typology key={index} defaultFields={this.state.defaultFields} read={this.read} typology={t} />
      </Card>
      </Col>

    );
    return (
      <div>
        <Button key={"s"} onClick={ this.addTypology} type="submit" size="md" color="primary">New Typology</Button>
          <hr/>
          <Row>
                {visualizeTypology}
          </Row>
      </div>
    );
}

}

export default Typologies;
