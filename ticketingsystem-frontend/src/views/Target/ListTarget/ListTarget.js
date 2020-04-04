import React, { PureComponent } from 'react';
import {  Card, CardBody, CardHeader, Table } from 'reactstrap';
import { Redirect } from 'react-router';
import Target from "./Target";
import _ from 'lodash';
import CustomPagination from "../../CustomPagination/CustomPagination";
import {
  RESULTS_PER_PAGE_TARGET_LIST, URL_CREATE_TARGET, URL_DELETE_TARGET,
  URL_GET_ADDS_FIELDS, URL_GET_ALL_TARGETS
} from '../../../_constants/configurationConstants';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const otherField = ["Name","Version","Category","Typology","Update","Clusters","Stopwords","Delete"];
const sortedFields = ["Name","Category"];

const showFields = ["name","version","category","typId"];
class ListTarget extends PureComponent{
  constructor(props) {

    super(props);

    this.state = {
      sorted:[],
      targets: [],
      targetsSorted: [],
      hiddenCard: false,
      currentPage: 1,
      id: "",
      typology : []
    };
    this.hiddenCard = this.hiddenCard.bind(this);
    this.chooseSorting= this.chooseSorting.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.getAttributeInSortedFields=this.getAttributeInSortedFields.bind(this);
    this.onShowClusters = this.onShowClusters.bind(this);
    this.readAdditionalFields = this.readAdditionalFields.bind(this);
    this.createNotification = this.createNotification.bind(this);
    this.selectPage = this.selectPage.bind(this);
    this.selectLastPage = this.selectLastPage.bind(this);
  }

  hiddenCard(){
    this.setState({hiddenCard: !this.state.hiddenCard});
    if(this.state.hiddenCard)
      document.getElementById("card-list").style.display = "block";
    else
      document.getElementById("card-list").style.display = "none";
  }

  chooseSorting(choice,index) {


    let newSorted = [];
    sortedFields.forEach((v, i) => {
      if (i === index)
        newSorted.push(!this.state.sorted[i]);
      else {
        newSorted.push(false);
      }
    });
    console.log(newSorted);
    this.setState({sorted: newSorted});
    console.log(this.state.sorted);
    let newListSorted =this.sort(this.state.targets, choice);
    this.setState({targetsSorted: newListSorted});

  }


  selectPage(page) {
    this.setState({
      currentPage: page
    });
  }

  selectLastPage() {
    this.setState({
      currentPage: Math.ceil(this.state.targets.length / RESULTS_PER_PAGE_TARGET_LIST)
    });
  }

  onShowClusters(targetId) {
    window.location.href = 'http://35.238.15.22:3000/#/target/ListTarget/Cluster?param='+targetId;
  }


  refreshList() {
    fetch(URL_DELETE_TARGET, {
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

  sort(vect,choice){
    console.log(vect);
    return _.sortBy(vect, [(o)=> {
      return o[choice]; }]);
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

  onDelete(target) {
    fetch((URL_DELETE_TARGET+ target.id), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then( (response)=> {
      if (response.ok) {
        this.createNotification("alert-success","TARGET DELETED","Target has been successfully deleted");
        this.refreshList();
      } else{
        response.json().then((r)=>{
            this.createNotification("alert-danger",r.title,r.text);
          }
        );
      }
    });

  }

  componentDidMount() {
    let newSorted = [];
    sortedFields.forEach(()=>{
      newSorted.push(false);
    });
    this.setState({sorted:newSorted});
    console.log(this.state.sorted);

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
    this.readAdditionalFields();
  }


  onUpdate(target, updatedTarget) {
    console.log( updatedTarget[0]);
    fetch((URL_CREATE_TARGET+ target.id), {
      method: 'PUT',
      body: JSON.stringify({
        category: updatedTarget[0],
        name: updatedTarget[1],
        version: updatedTarget[2],
        typId: updatedTarget[3]
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },

    }).then( (response)=> {
      if (response.ok) {
        this.createNotification("alert-success","TARGET UPDATED","Target has been successfully updated");
        this.refreshList();
      } else{
        response.json().then((r)=>{
            this.createNotification("alert-danger",r.title,r.text);
          }
        );
      }

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

  getRightVectorTargts(){
    for (let i = 0; i !==sortedFields.length; i++){

      if (this.state.sorted[i] === true)
        return this.state.targetsSorted;
    }
    return this.state.targets;
  }

  getAttributeInSortedFields(attribute) {
    let index=-1;
    sortedFields.forEach((field,i) => {
      if (field===attribute) {
        index=i;
        return index;
      }

    });
    return index;
  }

  visualizeItem(index,attribute){
    let render;
    if (!this.state.sorted[index]) {
      render = (<span className="fa fa-sort" onClick={this.chooseSorting.bind(this, attribute.toLowerCase(),index)}
                      style={{cursor: "pointer"}}/>);
    }
    else
      render = (<span className="fa fa-sort-asc" onClick={this.chooseSorting.bind(this, attribute.toLowerCase(),index)}
                      style={{cursor: "pointer"}}/>);
    return render;
  }

  render() {
    let generalTarget=this.getRightVectorTargts();
    let targets = generalTarget.map((target,index) =>
      <Target key={target.id} index={index} target={target} typology={this.state.typology}  onUpdate={this.onUpdate} showFields={showFields} onDelete={this.onDelete} onShowClusters = {this.onShowClusters}  refreshList={this.refreshList}  />
    );
    const indexOfFirstTarget = RESULTS_PER_PAGE_TARGET_LIST * (this.state.currentPage - 1);
    const indexOfLastTarget = RESULTS_PER_PAGE_TARGET_LIST * (this.state.currentPage);

    let tableHeader = otherField.map(attribute => {
      let render = false;
      let index;
      index=this.getAttributeInSortedFields(attribute);
      if(index !==-1 ){
        render=this.visualizeItem(index,attribute);
    }else{
        render=null;
      }
      return (
        <th key={attribute} style={{"textAlign": "center"}}>{attribute}{render}
        </th>
      );
    });

    const currentTableBody = targets.slice(indexOfFirstTarget, indexOfLastTarget);

    return (
      <div className="animated fadeIn">
        <Card  >
          <CardHeader>
            <i className="fa fa-align-justify" onClick={this.hiddenCard} style={{cursor:"pointer"}}/><strong>Target List</strong>
          </CardHeader>
          <CardBody id="card-list" style={{display: 'block'}}>
            <Table style={{tableLayout:"fixed"}} responsive striped size="sm">
              <thead bgcolor="#ADD8E6">
              <tr>

                <th width="5px"><b>#</b></th>

                {tableHeader}

              </tr>
              </thead>

              <tbody>
              {currentTableBody}
              </tbody>
            </Table>
            <div align="center">
              <div style={{display:"inline-block"}}>
                <CustomPagination numPages={Math.ceil(this.state.targets.length / RESULTS_PER_PAGE_TARGET_LIST)} selectPage={this.selectPage} currentPage={this.state.currentPage}/>
              </div>
            </div>

          </CardBody>
        </Card>

      </div>

    );
  }
}
export default ListTarget;
