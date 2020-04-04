import React, { Component } from 'react';
import { Badge, Button, Card, CardBody, CardHeader, Col, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
//import UserRegistrationDialog from "../UserRegistrationDialog";
import User from "../User";
import axios from 'axios';

/* Fields structure */
/* ID, Type, Description, Placeholder, not_a_field|hidden|show */
const fields = [
  ["id", "id", "ID", "", "not_a_field"],
  ["name", "text", "Name", "Enter Name..", "hide"],
  ["surname", "text", "Surname", "Enter Surname..", "show"],
  ["username", "text", "Username", "Enter Username..", "show"],
  ["password", "password", "Password", "Enter Password..", "hidden"],
  ["enabled", "enabled", "", "", "not_a_field"],
  ["TeamLeader", "checkbox", "", "", "not_a_field"],
  ["TeamMember", "checkbox", "", "", "not_a_field"]
];

const baseUrl = "http://35.239.133.8:8081/ticketingsystem/";

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
     selectedCheckboxes: new Set(),
      //fields: [],
	loading: true,
      modal: false,
      modal2: false,
      id: ""
    }
    ;

    this.toggle = this.toggle.bind(this);
this.finishLoading = this.finishLoading.bind(this);
  //  this.onDelete = this.onDelete.bind(this);
   // this.onUpdate = this.onUpdate.bind(this);
   // this.onCreate = this.onCreate.bind(this);
    this.refreshList = this.refreshList.bind(this);
    //this.selectedCheckboxes = this.selectedMount.bind(this);
    //this.selectedRadio = this.selectedRadio.bind(this);
    this.checkCheckbox = this.checkCheckbox.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.checkRadiobox = this.checkRadiobox.bind(this);
    this.toggleRadiobox = this.toggleRadiobox.bind(this);
    this.callbackToHandler = this.callbackToHandler.bind(this);
    //this.handleOptionChange = this.handleOptionChange.bind(this);
  }

callbackToHandler= (RadioHandler)=>{
this.RadioHandler=RadioHandler;
//this.RadioHandler=this.RadioHandler.bind(this);
}


  componentWillMount = () => {
   this.selectedCheckboxes = new Set();
    //this.selectedRadio;
  }
 /*
   handleOptionChange = function (changeEvent) {
    this.selectedRadio  =  changeEvent.target.value;
//      console.log(this.selectedRadio);
//      console.log(changeEvent.target.value);
}
*/
 toggleCheckbox = key => {

    if (this.selectedCheckboxes.has(key)) {
      this.selectedCheckboxes.delete(key);
    } else {
      this.selectedCheckboxes.add(key);
    }

  }

 toggleRadiobox = key => {
    if (this.selectedRadio==key) {
      this.selectedRadio=null;
    } else {
      this.selectedRadio=key;
    }

 //console.log(this.selectedRadio);
 if(this.RadioHandler instanceof Function)
   this.RadioHandler();
  }

  checkRadiobox = key => {

                    if(this.selectedRadio == null){
           //       console.log("selectedRadio is null");
                  return false
          }
          else if(this.selectedRadio == undefined){
         //         console.log("selectedRadio is undefined");
                  return false;
          }
          else if (this.selectedRadio == key)
                return true;
          else
                return false;

        // var array = Array.from(this.selectedCheckboxes);
        //console.log(this.selectedCheckboxes);
          //console.log(array);
       //this.array.map(member => {console.log(member+member);console.log(key+key);return true;});
         // return false;



  }

  checkCheckbox = key => {/*
	  if(this.selectedCheckboxes == null){
		  console.log("selectedCheckboxes is null");
		  return false
	  }
	  else if(this.selectedCheckboxes == undefined){
		  console.log("selectedCheckboxes is undefined");
		  return false;
	  }
	  */
	  /*
	  console.log(this.selectedCheckboxes);
	  if (this.selectedCheckboxes.hasOwnProperty('5b0b35e2ea2aaa3a48124462')){
		  console.log("checkCheckbox true");
		  return true;
	  }
	  else{
                  console.log("checkCheckbox false");
		 return false;
	  }
	  */
	  /*
for ( var prop in this.selectedCheckbox ) {
	console.log(prop);
}
*/
/*
setTimeout(()=> {
   console.log(this.selectedCheckboxes[key]);

},20);
	  if (this.selectedCheckboxes[key]=="y"){
                  console.log("checkCheckbox true");
                  return true;
          }
          else{
                  console.log("checkCheckbox false");
                 return false;
          }
	  */

/*
	            console.log(this.selectedCheckboxes);
*/
   	//console.log(this.selectedCheckboxes[key]);


	  //console.log(this.selectedCheckboxes.has(key));
	            if(this.selectedCheckboxes == null){
           //       console.log("selectedCheckboxes is null");
                  return false
          }
          else if(this.selectedCheckboxes == undefined){
         //         console.log("selectedCheckboxes is undefined");
                  return false;
          }
	  else if (this.selectedCheckboxes.has(key))
      		return true;
    	  else
      		return false;

	// var array = Array.from(this.selectedCheckboxes);
	//console.log(this.selectedCheckboxes);
	  //console.log(array);
       //this.array.map(member => {console.log(member+member);console.log(key+key);return true;});
	 // return false;



  }

  refreshList() {
    axios.get(baseUrl + "users/", {
      responseType: 'json'
    }).then(res => {
      this.setState({users: res.data});
    })

    axios.get(baseUrl +"teams/" + this.props.teamid + "/team_leader/", {
      responseType: 'json'
    }).then(res => {
      	this.selectedRadio = res.data.id;
    })
/*
    axios.get(baseUrl +"teams/" + this.props.teamid + "/members/", {
      responseType: 'json'
    }).then( this.selectedCheckboxes = {}).then((res)=>{
                        res.data.map((member)=>{this.selectedCheckboxes[member.id]="y";
                                //console.log(this);

                        });

        });
*/

    console.log(this.state.users);
    //this.forceUpdate();
    //alert("refresh");
  }

 /*
  onUpdate(user, updatedUser) {
    axios(baseUrl + "teams/" + user.id ,{
      method: 'PUT',
      data : updatedUser,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      //alert("success");
      this.refreshList();
    });
  }

  onDelete(team) {
    var res = axios.delete(baseUrl  + "teams/" + team.id, {
      responseType: 'json'
    }).then(res => {
      //alert("success");
      this.refreshList();
    });
  }

*/


finishLoading() {
this.setState({loading: false});
	if(typeof this.props.loadingHandler != 'undefined')
this.props.loadingHandler();
}



  componentDidMount() {
    axios.get(baseUrl + "users/", {
      responseType: 'json'
    }).then(res => {
        this.setState({users: res.data});
      }).then(
   ()=>{ if (typeof this.props.teamid != 'undefined'){
    axios.get(baseUrl +"teams/" + this.props.teamid + "/team_leader/", {
      responseType: 'json'
    }).then(res => {
	    	if(res.data != null)
                this.selectedRadio = res.data.id;
      })

    axios.get(baseUrl +"teams/" + this.props.teamid + "/members/", {
      responseType: 'json'
    }).then( this.selectedCheckboxes = new Set()).then((res)=>{
                        res.data.map((member)=>{this.selectedCheckboxes.add(member.id);
                                //console.log(this);

                        });

        })/*.then(

	this.props.loadingHandler()
	).then(

	()=>this.setState({loading: false})

	)*/.then(

	 //         console.log(this.selectedCheckboxes)

	);
  }
   }
).then(
                setTimeout(()=>{this.finishLoading();}, 500)
)
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    var users = this.state.users.map((user,index) =>
      <User key={user.id} user={user} fields={fields} selectedRadio={this.selectedRadio}
	    index={index} checkCheckbox={this.checkCheckbox}  toggleCheckbox={this.toggleCheckbox}
	    checkRadiobox={this.checkRadiobox}  toggleRadiobox={this.toggleRadiobox}
	    callbackToHandler={this.callbackToHandler}
	    /*handleOptionChange={this.handleOptionChange}*/
	    />
    );

    var tableHeader = fields.map(attribute => {
	/*
      if (attribute[0] == "edit") {
        return (
          <th key={attribute[0]}>Edit</th>
        );
      } else if (attribute[0] == "delete") {
        return (
          <th key={attribute[0]}>Delete</th>
        );*/
	if (attribute[1] == "checkbox") {
        return (


		<th key={attribute[0]} style={{textAlign:"center"}}>{attribute[0]}</th>


        );
      } else if (attribute[4] == "show") {
          return (
            <th key={attribute[0]}>{attribute[2]}</th>
          );
        }
      }
    );
          if (this.state.loading) {
  return (
        <div className="loading">Loading&#8230;</div>
  )}
else {

    return (
      <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify"></i> User List
        </CardHeader>


        <CardBody>
          <Table responsive striped size="sm">
            <thead>
            <tr>
              {tableHeader}
            </tr>
            </thead>

            <tbody>
              {users}
            </tbody>

          </Table>
  </CardBody>

  </Card>

  </div>

    );
  }
}
}
export default UserList;
