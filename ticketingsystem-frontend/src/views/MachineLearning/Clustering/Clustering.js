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
import {URL_CLUSTERING, URL_TARGET} from '../../../_constants/configurationConstants';
import {NotificationManager} from "react-notifications";

class Clustering extends Component {

  constructor(props) {
    super(props);

    this.state = {
      targets: [],
      target: "",
      hiddenCluster: false,
      numClusters: ""
    };

    // Binding dei metodi all'istanza del component
    this.handleChange = this.handleChange.bind(this);
    this.readTarget = this.readTarget.bind(this);
    this.hiddenCluster= this.hiddenCluster.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.createNotification = this.createNotification.bind(this);
  }

  /**
   * Ottieni la lista dei target tramite API REST e salva nello stato del component.
   */
  readTarget() {
    fetch(URL_TARGET,
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
    fetch((URL_CLUSTERING + this.state.target + '/' + this.state.numClusters),
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then( (response) => {
        if (response.ok) {
          console.log("Dati inviati correttamente", this.state);
          this.createNotification("alert-success", "The clusters has been successfully created.", "Clustering completed!");
        } else {
          this.createNotification("alert-danger", "Could not create the clusters.", "Something went wrong...");
        }
      });
  }

  hiddenCluster(){
    this.setState({hiddenCluster: !this.state.hiddenCluster});
    if(this.state.hiddenCluster)
      document.getElementById("card-cluster").style.display = "block";
    else
      document.getElementById("card-cluster").style.display = "none";
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
              <i className="fa fa-align-justify" onClick={this.hiddenCluster} style={{cursor:"pointer"}}/>
              <strong>Elaborate cluster</strong>
            </CardHeader>
            <Form onSubmit={this.handleClick} encType="multipart/form-data" className="form-horizontal">
              <CardBody id="card-cluster" style={{display: 'block'}}>
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
                      <Label htmlFor="input-text-numClusters">Number of clusters</Label>
                      <Input type="text" id="input-text-numClusters" name="numClusters" placeholder="Insert the number of desired clusters" onChange={this.handleChange} required />
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

export default Clustering;
