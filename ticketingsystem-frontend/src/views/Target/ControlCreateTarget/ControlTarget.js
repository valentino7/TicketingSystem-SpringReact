import React, { Component } from 'react';
import CreateTarget from "../AddTarget";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Col,
  Form,
} from 'reactstrap';
import { URL_GET_ADDS_FIELDS,URL_CREATE_TARGET} from '../../../_constants/configurationConstants';
import {NotificationContainer, NotificationManager} from 'react-notifications';


class ControlTarget extends Component{

  constructor(props) {
    super(props);

    this.state = {
      category: "",
      hiddenTarget: false,
      name: "",
      version: "",
      typology : [],
      typId : 0,
    };

    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.readAdditionalFields = this.readAdditionalFields.bind(this);
    this.createNotification = this.createNotification.bind(this);
    this.hiddenTarget = this.hiddenTarget.bind(this);
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
    this.readAdditionalFields();
  }

  readAdditionalFields(){
    fetch(URL_GET_ADDS_FIELDS, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then(res => {
        this.setState({
          typology: res,
        });
      })
      .catch( (error) => {
        console.log(error);
      });
  }


    handleClick(e){
      e.preventDefault();
      console.log("SUBMIT");
      fetch(URL_CREATE_TARGET, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            category: this.state.category,
            name: this.state.name,
            version: this.state.version,
            typId : this.state.typId
          }
        )
      }).then( (response)=> {
        if (response.ok) {
          this.createNotification("alert-success","TARGET CREATED","Target has been successfully created");
          window.location.href = 'http://35.238.15.22:3000/#/target/ListTarget';
        } else{
          response.json().then((r)=>{
              this.createNotification("alert-danger",r.title,r.text);
            }
          );
        }

      });

    }

  onChange(evt){
    this.setState({ [evt.target.name]: evt.target.value });
  }

  hiddenTarget(){
    this.setState({hiddenTarget: !this.state.hiddenTarget});
    if(this.state.hiddenTarget)
      document.getElementById("card-target").style.display = "block";
    else
      document.getElementById("card-target").style.display = "none";
  }
  render(){

    return(

      <React.Fragment>
        <Col md="9">
          <Card>
            <CardHeader> <i className="fa fa-align-justify" onClick={this.hiddenTarget} style={{cursor:"pointer"}}/>
              <strong>Create your target</strong>
            </CardHeader>
              <Form id="card-target" style={{display: 'block'}} onSubmit={this.handleClick} encType="multipart/form-data" className="form-horizontal">

              <CreateTarget {...this.state}  onChange={this.onChange}   />
                <CardFooter>
                  <Button  type="submit" size="md" color="primary" > Submit</Button>
                  <Button type="reset" size="md" color="danger" > Reset</Button>
                </CardFooter>
              </Form>

          </Card>
        </Col>
      </React.Fragment>
    );
  }
}
export default ControlTarget;
