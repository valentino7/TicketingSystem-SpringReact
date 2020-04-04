import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardHeader, Col, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import TeamRegistrationDialog from "../TeamRegistrationDialog";
import Team from "../Team";
import axios from 'axios';

/* Fields structure */
/* ID, Type, Description, Placeholder, not_a_field|hidden|show ....... collection*/
const teamFields = [
  ["id", "id", "ID", "", "not_a_field", "not_editable","",""],
  ["type", "text", "Type", "Enter the type..", "show","editable","select",""],
  ["teamLeader", "ref", "TeamLeader_ref", "", "hide","not_editable","radio","users"],
  ["teamLeaderSurname", "text", "TeamLeader", "", "show","not_editable","",""],
  ["teamMembers", "array_ref", "TeamMembers", "", "hide","not_editable","checkbox","users"],
  ["product", "text", "Target", "Enter the target..", "show","editable","select",""],
  ["enabled", "", "", "", "not_a_field","not_editable","enabled",""],
  ["edit", "", "", "", "not_a_field","not_editable","button",""],
  ["delete", "", "", "", "not_a_field","not_editable","button",""]
];

var selectField={};//= { "type":["Development","Help","R&S"] };
//var selfl=[this.props.internalRoles]*/ ;//{};// = { "type":["Development","Help","R&S"] };

const baseUrl = "http://35.239.133.8:8081/ticketingsystem/teams/";
const targetURL = "http://35.239.133.8:8081/ticketingsystem/target/";



class TeamList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      loading: false,
      //fields: [],
      modal: false,
      modal2: false,
      id: ""
    }
    ;

    this.toggle = this.toggle.bind(this);

    this.onDelete = this.onDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onCreate = this.onCreate.bind(this);
    //this.refreshList = this.refreshList.bind(this);
 //   this.mergeTeamLeaderList = this.mergeTeamLeaderList.bind(this);
   // this.handleOptionChange = this.handleOptionChange.bind(this);
   // this.toggleCheckbox = this.toggleCheckbox.bind(this);
   // this.handlerSelectedRadio = this.handlerSelectedRadio.bind(this);
   // this.handlerSelectedCheckboxes = this.handlerSelectedCheckboxes.bind(this);
  }

  componentWillMount = () => {
	             //selectField=[this.props.teamNames,];

	             //selectField.type= ["Development","Help","R&S"];
		selectField.type=this.props.teamNames;
	  	selectField.product=[];
 		axios.get(targetURL, {
      			responseType: 'json'
    		}).then(res => {
      			res.data.map( res => {
         			selectField.product=selectField.product.concat(res.name);
         		})
      		})
  }

  onCreate(newTeam) {
    axios(baseUrl,{
      method: 'POST',
      data : newTeam,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      //alert("success");
      this.props.refreshList();
    });
  }

  onUpdate(user, updatedTeam) {
    axios(baseUrl + user.id ,{
      method: 'PUT',
      data : updatedTeam,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      //alert("success");
      this.props.refreshList();
    });
  }

  onDelete(team) {
    var res = axios.delete(baseUrl + team.id, {
      responseType: 'json'
    }).then(res => {
      //alert("success");
      this.props.refreshList();
    });
  }

/*
  componentDidMount() {
  }
*/

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {

    var teams = this.props.teams.map(team =>
      <Team key={team.id} teamFields={teamFields} team={team} onUpdate={this.onUpdate} onDelete={this.onDelete} 
	    refreshList={this.props.refreshList} selectField={selectField}

      
       />
    );

    var tableHeader = teamFields.map(attribute => {
      if (attribute[0] == "edit") {
        return (
          <th key={attribute[0]}>Edit</th>
        );
      } else if (attribute[0] == "delete") {
        return (
          <th key={attribute[0]}>Delete</th>
        );
      } else if (attribute[4] == "show") {
          return (
            <th key={attribute[0]}>{attribute[2]}</th>
          );
        }
    }  
    );

    return (

      <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify"></i> Team List
        </CardHeader>
        <CardBody>
          <Table responsive striped size="sm">
            <thead>
            <tr>
              {tableHeader}
            </tr>
            </thead>
            <tbody>
              {teams}
            </tbody>
          </Table>

    <Col xs="12" lg="6">
      <TeamRegistrationDialog teamFields={teamFields} onCreate={this.onCreate} refreshList={this.props.refreshList} 
	   selectField={selectField}
	    />
    </Col>
  </CardBody>
  </Card>

  </div>

    );
 }
}

export default TeamList;
