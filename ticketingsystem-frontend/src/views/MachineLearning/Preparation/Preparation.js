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
  // Row,
  // Modal,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  // FormFeedback,
} from 'reactstrap';
import {URL_PREPARATION} from '../../../_constants/configurationConstants';
import {NotificationManager} from "react-notifications";


class Preparation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      targets: [],
      target: "",
      percentLSA: "",
      hiddenTraining: false
    };

    // Binding dei metodi all'istanza del component
    this.handleChange = this.handleChange.bind(this);
    this.readTarget = this.readTarget.bind(this);
    this.hiddenTraining = this.hiddenTraining.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.createNotification = this.createNotification.bind(this);
  }

  /**
   * Ottieni la lista dei target tramite API REST e salva nello stato del component.
   */
  readTarget() {
    let URLTarget = "http://35.239.133.8:8081/ticketingsystem/target/";

    fetch(URLTarget,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(res => {
        this.setState({targets: res });
      });
  }

  createNotification(type, message, title) {
    switch (type) {
      case "alert-success":
        NotificationManager.success(message.toString(), title, 3000);
        break;
      case "alert-danger":
        NotificationManager.error(message.toString(), title, 5000);
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    this.readTarget(); // Popola la lista dei target quando il componente viene montato
  }

  /**
   * Gestisci il cambiamento di stato di un component, ad esempio se modificato dall'utente.
   *
   * evt.target e' l'intero elemento HTML "target" dell'evento, ad esempio un elemento <input> di type = text.
   * evt.target.name e' il name dell'elemento html target.
   *
   * @param evt   L'evento che ha causato il cambiamento di un component.
   */
  handleChange(evt) {
    // notazione dizionario di ES6: {oggetto} con all'interno coppie chiave-valore
    let change = { [evt.target.name]: evt.target.value };
    this.setState(change); // prende un singolo campo dello stato e lo aggiorna
  }

  /**
   * Gestisci il Submit dell'utente facendo POST all'API REST del clustering.
   */
  handleClick(evt) {
    evt.preventDefault();
    console.log("SUBMIT");

    console.log("Premuto submit", this.state);
    fetch(URL_PREPARATION + this.state.target + '/' + this.state.percentLSA,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then( (response) => {
        if (response.ok) {
          console.log("Dati inviati correttamente", this.state);
          this.createNotification("alert-success", "The dataset has been successfully created.", "Preparation completed!");
        } else {
          this.createNotification("alert-danger", "Could not create the dataset.", "Something went wrong...");
        }
      });
  }

  hiddenTraining(){
    this.setState({hiddenTraining: !this.state.hiddenTraining});
    if(this.state.hiddenTraining)
      document.getElementById("card-training").style.display = "block";
    else
      document.getElementById("card-training").style.display = "none";
  }


  render() {
    // Mappa i target dello stato nelle opzioni della select HTML
    let targetOptions = this.state.targets.map(
      t => <option key={t.id} value={t.id}>{t.name}</option>
    );
    return(
      <React.Fragment>
        <Col md="9">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" onClick={this.hiddenTraining} style={{cursor:"pointer"}}/>
              <strong>Prepare dataset</strong>
            </CardHeader>

            <Form onSubmit={this.handleClick} encType="multipart/form-data" className="form-horizontal">
              <CardBody id="card-training" style={{display: 'block'}}>
                <FormGroup row>
                  <Col>
                    <Label>Target</Label>
                    <Input type="select" name="target" id="select-target" onChange={this.handleChange} required>
                      <option value="">Please select</option>
                      {targetOptions}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6">
                    <FormGroup>
                      <Label htmlFor="input-text-lsa">LSA % reduction</Label>
                      <Input type="text" id="input-text-lsa" name="percentLSA" placeholder="Insert the percentage of LSA reduction" onChange={this.handleChange} required />
                    </FormGroup>
                  </Col>
                </FormGroup>
              </CardBody>

              <CardFooter>
                <Button type="submit" size="md" color="primary" > Submit</Button>
                <Button type="reset" size="md" color="danger" > Reset</Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </React.Fragment>
    );
  }
}

export default Preparation;
