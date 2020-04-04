import React, { Component } from 'react';
import {
  Label,
  Input,
  Card,
  CardBody,
  FormGroup,
  Form,
  Col,
  Modal,
  Row,
  Table,
  Button,
  Buttton,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import _ from 'lodash';
import Stopword from "./Stopword";
import CustomPagination from "../../CustomPagination/CustomPagination";
import { RESULTS_PER_PAGE_STOPWORDS_LIST,URL_CREATE_STOPWORD,URL_DELETE_STOPWORD,URL_GET_STOPWORDS_BY_TARGET } from '../../../_constants/configurationConstants';
import {NotificationContainer, NotificationManager} from 'react-notifications';



const fields=[
  /* ID, field name, Type, Placeholder */
  ["value", "Value"],
  ["delete","Delete"]
];
//"role"


class Stopwords extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      currentPage: 1,
      stopName : "",
      stopwordsSorted: [],
      sorted: false,
      stopwords: []
    };
    this.sorting= this.sorting.bind(this);
    this.createNotification = this.createNotification.bind(this);
    this.showStopwords = this.showStopwords.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.selectPage = this.selectPage.bind(this);
    this.selectLastPage = this.selectLastPage.bind(this);
    this.onCreate = this.onCreate.bind(this);

  }


  sorting(){
    this.setState({sorted: !this.state.sorted})
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

  selectPage(page) {
    this.setState({
      currentPage: page
    });
  }

  selectLastPage() {
    this.setState({
      currentPage: Math.ceil(this.state.targets.length / RESULTS_PER_PAGE_STOPWORDS_LIST)
    });
  }

  onCreate(event){
    event.preventDefault();
    fetch((URL_CREATE_STOPWORD), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          value: this.state.stopName,
          targets:[{
            id :this.props.target,
            ref: "target"}]
        }
      )

    }).then( (response)=> {
      if (response.ok) {
        response.json().then((r)=>{
            console.log(r.message)
          }
        );
        this.createNotification("alert-success","STOPWORD CREATED","Stopword has been successfully created");
        this.refreshList();
      }else{
        response.json().then((r)=>{
            this.createNotification("alert-danger", r.title,r.text);
          }
        );
      }
    })
  }

  onDelete(value) {
    fetch((URL_DELETE_STOPWORD +"/"+ this.props.target), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          value: value
      }
      )
    })
    .then( (response)=> {
      if (response.ok) {
        this.createNotification("alert-success","STOPWORD DELETED","Stopword has been successfully deleted");
        this.refreshList();
      }else{
        response.json().then((r)=>{
            this.createNotification("alert-danger",r.title,r.text);
          }
        );
      }
    });


  }

  sort(vect){
    return _.sortBy(vect, [(o)=> {
      //console.log(o.value);
      return o.value; }]);

  }

  refreshList(){
    fetch((URL_GET_STOPWORDS_BY_TARGET + this.props.target), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then(res => {
        this.setState({stopwordsSorted :  this.sort(res)});
        this.setState({stopwords :  res});
      });
  }

  showStopwords(){
    this.refreshList();
    this.toggle();
  }


  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };


  onChange(evt){
    this.setState({ [evt.target.name]: evt.target.value });
  }

  fTableHeader(){
    let render;
    let tableHeader = fields.map(field =>{
      if(field[1] === "Value"){
        if(this.state.sorted ===false)
          render=(<span className="fa fa-sort" onClick={this.sorting} style={{cursor:"pointer"}} />);
        else
          render=(<span className="fa fa-sort-asc" onClick={this.sorting} style={{cursor:"pointer"}} />);

      }else{
        render=null;
      }


      return (<th style={{"textAlign":"center"}} key={field[0]}>{field[1]}
        {render}
      </th>);

    });
    return tableHeader;
  }


  fTableRows(indexOfFirstTarget, indexOfLastTarget){
    let generalStopwords;
    if(this.state.sorted===false)
      generalStopwords=this.state.stopwords;
    else
      generalStopwords=this.state.stopwordsSorted;
    let tableRows= generalStopwords.map((value,index)=>
      <Stopword key={index}  index={index} value={value["value"]}  onDelete={this.onDelete}/>
    );

    return  tableRows.slice(indexOfFirstTarget, indexOfLastTarget);
  }

  render() {

    const indexOfFirstStopword = RESULTS_PER_PAGE_STOPWORDS_LIST * (this.state.currentPage - 1);
    const indexOfLastStopword = RESULTS_PER_PAGE_STOPWORDS_LIST * (this.state.currentPage);
    return (
      <div className="animated fadeIn">
        <i style={{cursor:"pointer"}} onClick={this.showStopwords} className="fa fa-file-text fa-lg mt-1"/><br />
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><strong>Stopwords Visualize</strong></ModalHeader>
          <ModalBody>
            <div className="animated fadeIn">
              <Card>
                    <React.Fragment>
                      <CardBody>
                        <Label htmlFor="text-input" ><strong>Stopword name</strong></Label>
                          <Form onSubmit={this.onCreate} inline  className="was-validated">
                            <div style={{width:"100%"}}>
                              <Input  style={{width:"80%"}} type="text" name="stopName" id="text-input"  placeholder="Insert the name of a stopword..." onChange={this.onChange} required />
                              <Button style={{width:"20%"}} size="md" color="primary" > Save</Button>
                            </div>
                          </Form>
                      </CardBody>
                      <hr/>

                      <Col md="13">
                        <Table style={{tableLayout:"fixed"}} responsive striped size="sm">
                          <thead bgcolor="#ADD8E6">
                          <tr>
                            <th width="30px"><b>#</b></th>
                            {this.fTableHeader()}

                          </tr>
                          </thead>
                          <tbody>
                          {this.fTableRows(indexOfFirstStopword,indexOfLastStopword)}
                          </tbody>
                        </Table>
                        <div align="center">
                          <div style={{display:"inline-block"}}>
                            <CustomPagination numPages={Math.ceil(this.state.stopwords.length / RESULTS_PER_PAGE_STOPWORDS_LIST)} selectPage={this.selectPage} currentPage={this.state.currentPage}/>
                          </div>
                        </div>
                      </Col>
                    </React.Fragment>
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
export default Stopwords;


